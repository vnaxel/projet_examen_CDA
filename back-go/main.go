package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"time"

	"mock-event/producer"

	"github.com/Shopify/sarama"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type recipient struct {
	Id               primitive.ObjectID `bson:"_id" json:"_id"`
	SendingId        string             `bson:"sendingId" json:"sendingId"`
	SenderName       string             `bson:"senderName" json:"senderName"`
	Address          string             `bson:"address" json:"address"`
	FirstName        string             `bson:"firstName" json:"firstName"`
	LastName         string             `bson:"lastName" json:"lastName"`
	DeliveryStatuses deliveryStatuses   `bson:"deliveryStatuses" json:"deliveryStatuses"`
	Version          int                `bson:"__v" json:"__v"`
}

type deliveryStatuses struct {
	LastStatus      status   `bson:"lastStatus" json:"lastStatus"`
	StatusesHistory []status `bson:"statusesHistory" json:"statusesHistory"`
}

type status struct {
	Status string    `bson:"status" json:"status"`
	Date   time.Time `bson:"date" json:"date"`
}

type recipientEvent struct {
	OperationType string              `bson:"operationType"`
	ClusterTime   primitive.Timestamp `bson:"clusterTime"`
	FullDocument  recipient           `bson:"fullDocument"`
}

var p, _ = producer.NewProducer([]string{"localhost:9092"})

func main() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		fmt.Println(err)
		return
	}

	collection := client.Database("sendings").Collection("recipients")

	stream, err := collection.Watch(context.TODO(), mongo.Pipeline{
		bson.D{{Key: "$match", Value: bson.D{{Key: "operationType", Value: "insert"}}}},
	})
	if err != nil {
		fmt.Println(err)
		return
	}

	for stream.Next(context.TODO()) {
		var changeEvent recipientEvent
		err := stream.Decode(&changeEvent)
		if err != nil {
			log.Fatal(err)
		}

		go produceAndDeliver(changeEvent.FullDocument)
	}

	if err := stream.Err(); err != nil {
		fmt.Println(err)
		return
	}
}

func produceAndDeliver(recipient recipient) {

	// STAGE 1 PRODUCED EVENT (10-20 seconds)
	duration := time.Duration(rand.Intn(20-10+1)+10) * time.Second
	time.Sleep(duration)

	recipient.DeliveryStatuses.StatusesHistory = append([]status{recipient.DeliveryStatuses.LastStatus}, recipient.DeliveryStatuses.StatusesHistory...) // append a the start of the array (unshift/prepend)
	recipient.DeliveryStatuses.LastStatus = status{Date: time.Now().Round(3 * time.Millisecond).UTC(), Status: "PRODUCED"}

	fmt.Println(recipient)

	eventMarshal, _ := json.Marshal(recipient.DeliveryStatuses)
	idMarshal, _ := json.Marshal(recipient.Id)

	p.Input <- &sarama.ProducerMessage{
		Topic: "statuses_topic",
		Key:   sarama.StringEncoder(idMarshal),
		Value: sarama.StringEncoder(eventMarshal),
	}

	// STAGE 2 DELIVERED EVENT (10-20 seconds)
	time.Sleep(duration)

	//get a random string within those two "DELIVERED" "NOT_FOUND" with 80% probability for DELIVERED and 20% probability for NOT_FOUND
	rand.Seed(time.Now().UnixNano())
	random := rand.Intn(100)
	var randomStatus string
	if random < 80 {
		randomStatus = "DELIVERED"
	} else {
		randomStatus = "NOT_FOUND"
	}

	recipient.DeliveryStatuses.StatusesHistory = append(recipient.DeliveryStatuses.StatusesHistory, recipient.DeliveryStatuses.LastStatus) // append a the end of the array (push/append)
	recipient.DeliveryStatuses.LastStatus = status{Date: time.Now().Round(3 * time.Millisecond).UTC(), Status: randomStatus}

	fmt.Println(recipient)

	eventMarshal2, _ := json.Marshal(recipient.DeliveryStatuses)
	idMarshal2, _ := json.Marshal(recipient.Id)

	p.Input <- &sarama.ProducerMessage{
		Topic: "statuses_topic",
		Key:   sarama.StringEncoder(idMarshal2),
		Value: sarama.StringEncoder(eventMarshal2),
	}
}

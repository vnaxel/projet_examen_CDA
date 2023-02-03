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
		var changeEvent map[string]interface{}
		err := stream.Decode(&changeEvent)
		if err != nil {
			log.Fatal(err)
		}
		go produceAndDeliver(changeEvent)
	}

	if err := stream.Err(); err != nil {
		fmt.Println(err)
		return
	}
}

func produceAndDeliver(event map[string]interface{}) {

	// STAGE 1 PRODUCED EVENT (10-20 seconds)
	duration := time.Duration(rand.Intn(20-10+1) + 10) * time.Second
	time.Sleep(duration)

	statusesHistory := event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["statusesHistory"]
	lastStatus := event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["lastStatus"]

	statusesHistory = append(statusesHistory.(primitive.A), lastStatus)
	lastStatus = map[string]interface{}{"date": time.Now().Round(3 * time.Millisecond), "status": "PRODUCED"}

	event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["statusesHistory"] = statusesHistory
	event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["lastStatus"] = lastStatus

	fmt.Println(event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{}))

	eventMarshal, _ := json.Marshal(event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{}))
	idMarshal, _ := json.Marshal(event["fullDocument"].(map[string]interface{})["_id"].(primitive.ObjectID))

	p.Input <- &sarama.ProducerMessage{
		Topic: "statuses_topic",
		Key:   sarama.StringEncoder(idMarshal),
		Value: sarama.StringEncoder(eventMarshal),
	}

	// STAGE 2 DELIVERED EVENT (10-20 seconds)
	time.Sleep(duration)

	//get a random string within those two "DELIVERED" "INVALID_ADDRESS" with 80% probability for DELIVERED and 20% probability for INVALID_ADDRESS
	rand.Seed(time.Now().UnixNano())
	random := rand.Intn(100)
	var status string
	if random < 80 {
		status = "DELIVERED"
	} else {
		status = "INVALID_ADDRESS"
	}

	statusesHistory = append(statusesHistory.(primitive.A), lastStatus)
	lastStatus = map[string]interface{}{"date": time.Now().Round(3 * time.Millisecond), "status": status}

	event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["statusesHistory"] = statusesHistory
	event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{})["lastStatus"] = lastStatus

	fmt.Println(event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{}))

	eventMarshal2, _ := json.Marshal(event["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{}))
	idMarshal2, _ := json.Marshal(event["fullDocument"].(map[string]interface{})["_id"].(primitive.ObjectID))

	p.Input <- &sarama.ProducerMessage{
		Topic: "statuses_topic",
		Key:   sarama.StringEncoder(idMarshal2),
		Value: sarama.StringEncoder(eventMarshal2),
	}
}
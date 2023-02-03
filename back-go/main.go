package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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
		fmt.Println(changeEvent["fullDocument"].(map[string]interface{})["deliveryStatuses"].(map[string]interface{}))
	}

	if err := stream.Err(); err != nil {
		fmt.Println(err)
		return
	}
}

func produceAndDeliver(event map[string]interface{}) {
	
}
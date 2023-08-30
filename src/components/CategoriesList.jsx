"use client";
import React from "react";
import { List, ListItem, Card } from "@material-tailwind/react";
import Link from "next/link";

export default function CategoriesList({ data }) {

  // Organize categories into groups based on their initial letter
  const categorizedData = data.reduce((acc, category) => {
    const initialLetter = category.name.charAt(0).toUpperCase();
    if (!acc[initialLetter]) {
      acc[initialLetter] = [];
    }
    acc[initialLetter].push(category);
    return acc;
  }, {});

  return (
    <>
    {Object.keys(categorizedData).map((letter) => (
        <div
          key={letter}
          className="lg:w-2/3 flex flex-col gap-4 sm:flex-row sm:items-center items-start mx-auto mt-3"
        >
          <h1>{letter}</h1>
          <Card className="w-full">
            <List className="w-full">
              {categorizedData[letter].map((category) => (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <ListItem className="w-full">{category.name}</ListItem>
                </Link>
              ))}
            </List>
          </Card>
        </div>
      ))}
    </>
  );
}

const usersShoppingData = [
  {
    userId: "1",
    userName: "Jason",
    address: {
      street: "123 Main St",
      city: "Cityville",
      zipCode: "12345",
      country: "US",
    },
    itemsInCart: [
      {
        itemId: "item001",
        itemName: "Basketball",
        quantity: 2,
        price: 20.99,
      },
      {
        itemId: "item002",
        itemName: "Cooking Set",
        quantity: 1,
        price: 49.99,
      },
      {
        itemId: "item003",
        itemName: "Camping Gear",
        quantity: 3,
        price: 79.99,
      },
    ],
    totalItems: 6,
    totalPrice: 299.94,
  },
  {
    userId: "2",
    userName: "May",
    address: {
      street: "456 Park Ave",
      city: "New York",
      zipCode: "54321",
      country: "US",
    },
    itemsInCart: [
      {
        itemId: "item001",
        itemName: "Basketball",
        quantity: 2,
        price: 20.99,
      },
      {
        itemId: "item004",
        itemName: "Tent",
        quantity: 1,
        price: 199.99,
      },
    ],
    totalItems: 3,
    totalPrice: 241.97,
  },
  {
    userId: "3",
    userName: "Sara",
    address: {
      street: "789 Main St",
      city: "Smalltown",
      zipCode: "23456",
      country: "US",
    },
    itemsInCart: [
      {
        itemId: "item005",
        itemName: "Soccer Ball",
        quantity: 1,
        price: 14.99,
      },
      {
        itemId: "item003",
        itemName: "Camping Gear",
        quantity: 3,
        price: 79.99,
      },
    ],
    totalItems: 4,
    totalPrice: 224.98,
  },
];
// const userInfo = [];
// usersShoppingData.forEach((data) => {
//   let user = {};
//   let itemArr = [];
//   data["itemsInCart"].forEach((item) => {
//     itemArr.push(item["itemName"]);
//   });
//   user[data["userName"]] = {
//     full_address: `${data["address"]["street"]} ${data["address"]["city"]} ${data["address"]["country"]} ${data["address"]["zipCode"]}`,
//     total_items_Count: data["totalItems"],
//     total_price: data["totalPrice"],
//     total_items: itemArr,
//   };
//   userInfo.push(user);
// });
// console.log(userInfo);

// const itemSold = {};
// usersShoppingData.forEach((data) => {
//   data["itemsInCart"].forEach((item) => {
//     if (!(item["itemId"] in itemSold)) {
//       itemSold[item["itemId"]] = item["quantity"];
//     } else {
//       itemSold[item["itemId"]] += item["quantity"];
//     }
//   });
// });

const soldRecord = {};
usersShoppingData.forEach((data) => {
  data["itemsInCart"].forEach((item) => {
    if (!(item["itemId"] in soldRecord)) {
      soldRecord[item["itemId"]] = {
        total_quantity: item["quantity"],
        itemName: item["itemName"],
        total_price: item["price"],
        customers: [data["userName"]],
      };
    } else {
      soldRecord[item["itemId"]]["total_quantity"] += item["quantity"];
      soldRecord[item["itemId"]]["total_price"] += item["price"];
      soldRecord[item["itemId"]]["customers"].push(data["userName"]);
    }
  });
});
console.log(soldRecord);
console.log(usersShoppingData);

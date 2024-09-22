import React from "react";
const List = [
  {
    title: "Ananya Sharma",
    desc: "ananya.sharma@email.com",
    price: "+₹1,999.00",
  },
  {
    title: "Arjun Verma",
    desc: "arjun.verma@email.com",
    price: "+₹39.00",
  },
  {
    title: "Ishita Singh",
    desc: "ishita.singh@email.com",
    price: "+₹299.00",
  },
  {
    title: "Rohan Mehta",
    desc: "rohan.mehta@email.com",
    price: "+₹99.00",
  },
  {
    title: "Aditi Patil",
    desc: "aditi.patil@email.com",
    price: "+₹39.00",
  },
  {
    title: "Rohan Mehta",
    desc: "rohan.mehta@email.com",
    price: "+₹99.00",
  },
  {
    title: "Aditi Patil",
    desc: "aditi.patil@email.com",
    price: "+₹39.00",
  },
];


const ResentSales = () => {
  return (
    <div className="h-[100%] shadow-cardShadow rounded-md p-[24px] overflow-hidden flex flex-col">
      <div>
        <h3 className="text-cardHeader font-cardHeader">Recent Sales</h3>
        <p className="text-cardDescription font-cardDescription">
          You made 75 sales this month.
        </p>
      </div>
      <div className="mt-5 flex-1 overflow-y-auto hide-scrollbar">
        {List.map((item, index) => {
          const { title, desc, price } = item;
          return (
            <div key={index} className="flex justify-between items-center py-2">
              <div>
                <h5 className="font-cardSubHeader text-cardSubHeader">
                  {title}
                </h5>
                <p className="text-cardDescription font-cardDescription">
                  {desc}
                </p>
              </div>
              <div>
                <h5 className="font-cardHeader text-cardSubHeader">{price}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResentSales;


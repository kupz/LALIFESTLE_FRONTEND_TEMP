import React from "react";
import {
  convertToPositive,
  formatNumberWithCommas,
  fromUTCtoManila,
} from "../../../services/utils";
import { useSignals } from "@preact/signals-react/runtime";

function A4page({ headers, content }) {
//   console.log("content", content);
  useSignals();
  return (
    <div className="bg-white p-20 flex flex-col a4-page border border-black font-medium">
      <div className="flex w-full justify-between">
        <div className="flex flex-col ml-16 mt-5">
          <p>Transaction #: {headers.id}</p>
          <p className="mt-10">{headers.store__name}</p>
          <p>{headers.store__consignor}</p>
          <p>Watsons Consignor</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-16">{fromUTCtoManila(headers.date_time)}</p>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-2">
        {content?.map((item) => {
          return (
            <div key={item.product__id} className="grid grid-cols-12 text-xs">
              <p className="col-span-2">{convertToPositive(item.quantity)}</p>
              <p className="col-span-2">{item.product__code}</p>
              <p className="col-span-5">{`${item.product__brand__name} ${item.product__description} - ${item.product__variant}`}</p>
              <p className="col-span-2">{item.price}</p>
              <p className="col-span-1">
                {formatNumberWithCommas(
                  convertToPositive(item.quantity) * item.price
                )}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-10">
        <p>
          {formatNumberWithCommas(
            content?.reduce(
              (accumulator, currentValue) =>
                accumulator + convertToPositive(currentValue.quantity),
              0
            )
          )}
        </p>
        <p>
          {formatNumberWithCommas(
            content?.reduce(
              (accumulator, currentValue) =>
                accumulator +
                convertToPositive(currentValue.quantity) *
                  parseFloat(currentValue.price),
              0
            )
          )}
        </p>
      </div>
    </div>
  );
}

export default A4page;

"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./_components/Button";
import { ChevronLeft, ChevronRight } from "./_components/Icons";

const paymentFrequencies = [
  {
    id: 1,
    name: 'Semanal',
    value: 7
  },
  {
    id: 2,
    name: 'Quincenal',
    value: 15
  },
  {
    id: 3,
    name: 'Mensual',
    value: 30
  }
];
// Mock data for vehicles (motorcycles and eBikes)
const vehicles = {
  motorcycle: [
    { id: '1', name: 'Sport Bike 2000', price: 5000, image: 'https://images.freeimages.com/images/large-previews/947/motorcycle-1311319.jpg?fmt=webp&w=400' },
    { id: '2', name: 'Cruiser 1500', price: 7000, image: 'https://images.freeimages.com/images/large-previews/a49/moto-cross-1411273.jpg?fmt=webp&w=400/' },
    { id: '3', name: 'Adventure 3000', price: 9000, image: 'https://images.freeimages.com/images/large-previews/a74/motorcycle-1449494.jpg?fmt=webp&w=500/' },
  ],
  eBike: [
    { id: '4', name: 'City Rider', price: 2000, image: 'https://media.istockphoto.com/id/1415317051/photo/black-electric-bike-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=KLlFOJEFWPpSDe9TWB2kqGKS2GuvNp_mhe7y53wnIfA=' },
    { id: '5', name: 'Mountain Explorer', price: 2500, image: 'https://media.istockphoto.com/id/1429417091/photo/electric-bicycle-sharing-service.jpg?s=612x612&w=0&k=20&c=74paJtQxOEcRt0GvRBvy-JmDdc8tiYv-ZyVQqcN3I_s=' },
    { id: '6', name: 'Folding Commuter', price: 1800, image: 'https://media.istockphoto.com/id/1429417091/photo/electric-bicycle-sharing-service.jpg?s=612x612&w=0&k=20&c=74paJtQxOEcRt0GvRBvy-JmDdc8tiYv-ZyVQqcN3I_s=' },
  ]
}

type PaymentTypes = "Mensual" | "Quincenal" | "Semanal"

const Form = () => {
  const [state, setState] = useState<{
    creditType: "microCredit" | "vehicle";
    paymentFrequency: PaymentTypes;
    vehicleType: "motorcycle" | "eBike";
    selectedVehicle: { id: string; name: string; price: number; image: string };
    currentIndex: number;
    loanAmount: number;
    interestRate: number;
    quota: number | null;
  }>({
    creditType: 'microCredit',
    paymentFrequency: 'Mensual',
    vehicleType: 'motorcycle',
    selectedVehicle: vehicles.motorcycle[0],
    currentIndex: 0,
    loanAmount: 0,
    interestRate: 0,
    quota: null
  });

  const handlePrevious = () => {
    setState((prevState) => ({
      ...prevState,
      selectedVehicle: vehicles[prevState.vehicleType][prevState.currentIndex > 0 ? prevState.currentIndex - 1 : vehicles[prevState.vehicleType].length - 1],
      currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : vehicles[prevState.vehicleType].length - 1
    }))
  }

  const handleNext = () => {
    setState((prevState) => ({
      ...prevState,
      selectedVehicle: vehicles[prevState.vehicleType][prevState.currentIndex < vehicles[prevState.vehicleType].length - 1 ? prevState.currentIndex + 1 : 0],
      currentIndex: prevState.currentIndex < vehicles[prevState.vehicleType].length - 1 ? prevState.currentIndex + 1 : 0
    }))
  }

  const calculateQuota = () => {
    let amount = 0
    if (state.creditType === 'microCredit') {
      amount = state.loanAmount
    } else {
      amount = state.selectedVehicle?.price || 0
    }
    const rate = state.interestRate / 100 / 12
    const periods = state.paymentFrequency === 'Semanal' ? 52 : state.paymentFrequency === 'Quincenal' ? 26 : 12
    if (amount && rate && periods) {
      const calculatedQuota = (amount * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
      setState({ ...state, quota: calculatedQuota })
    }
  }


  return (
    <form className="space-y-6 grid my-3">
      <label>Tipo de Crédito</label>
      <section className="flex">
        <div className="flex items-center me-4">
          <input
            type="radio"
            value="microCredit"
            name="creditType"
            checked={state.creditType === "microCredit"}
            onChange={() => setState({ ...state, creditType: "microCredit" })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Micro crédito</label>
        </div>
        <div className="flex items-center me-4">
          <input
            type="radio"
            value="vehicle"
            name="creditType"
            checked={state.creditType === "vehicle"}
            onChange={() => setState({ ...state, creditType: "vehicle" })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehículo</label>
        </div>
      </section>

      <section>
        <label>Frecuencia de Pagos</label>
        <select
          name="paymentFrequency"
          value={state.paymentFrequency}
          onChange={(e) => setState({ ...state, paymentFrequency: e.target.value as PaymentTypes })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {paymentFrequencies.map((paymentFrequency) => (
            <option key={paymentFrequency.id} value={paymentFrequency.name}>{paymentFrequency.name}</option>
          ))}
        </select>
      </section>

      <section>
        <label htmlFor="interestRate">Tasa de interés {"(%)"}</label>
        <input
          type="number"
          name="interestRate"
          onChange={(e) => setState({ ...state, interestRate: parseFloat(e.target.value) })}
          value={state.interestRate}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </section>

      {state.creditType === 'microCredit' && (
        <section className="space-y-2">
          <label htmlFor="amount">Cantidad del préstamo</label>
          <input
            type="number"
            name="amount"
            onChange={e => {
              setState({ ...state, loanAmount: parseFloat(e.target.value)

               })}}
            value={state.loanAmount}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </section>
      )}
      {state.creditType === "vehicle" && (
        <section className="grid gap-2">
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                type="radio"
                value="motorcycle"
                name="vehicleType"
                checked={state.vehicleType === "motorcycle"}
                onChange={() => setState({
                  ...state,
                  vehicleType: "motorcycle",
                  selectedVehicle: vehicles.motorcycle[0],

                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="vehicleType"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Motocicletas
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                type="radio"
                value="eBike"
                name="vehicleType"
                checked={state.vehicleType === "eBike"}
                onChange={() => setState({
                  ...state,
                  vehicleType: "eBike",
                  selectedVehicle: vehicles.eBike[0],
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="vehicleType"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                eBike
              </label>
            </div>
          </div>
          <div className="relative">
            <Image
              src={state.selectedVehicle.image}
              alt={state.selectedVehicle.name}
              width={400}
              height={300}
              className="rounded-lg mx-auto h-[300px] w-[400px] object-cover"
            />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{state.selectedVehicle.name}</h3>
            <p className="text-sm text-gray-500">Precio: ${state.selectedVehicle.price}</p>
          </div>
        </section>
      )}

      {state.interestRate > 0 && state.loanAmount > 0 && (
        <>
          <footer className="flex justify-between gap-4">

            <Button type="button" onClick={calculateQuota}>Calcular Cuota</Button>



            <Button type="submit">Formalizar Compra</Button>
          </footer>

          {state.quota && (
            <div className="p-4 bg-secondary text-center">
              <p className="font-semibold"> {state.paymentFrequency} Pagos estimados:</p>
              <p className="text-2xl font-bold">${state.quota.toFixed(2)}</p>
            </div>
          )}
        </>
      )}

    </form>
  );
}

export default Form;
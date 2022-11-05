import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { MdLocationPin } from "react-icons/md";

const API_KEY_WEATHER = "71585230520b21cb7477de35c2996770";
const API_KEY_LOCATION = "at_EKmlmsfxtYURiXfz5yFc2yDDJnOiJ";
const baseUrl = "https://api.openweathermap.org/data/2.5";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();

  const [weatherData, setWeatherData] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        const serverResponse = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_API_KEY_LOCATION}`
        );
        const data = await serverResponse.json();
        console.log(data);
        setLon(data.location.lng);
        setLat(data.location.lat)
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const getWeatherDataCity = async () => {
    try {
      const serverResponse = await fetch(
        `${baseUrl}/weather?q=${cityInput}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric`
      );
      const data = await serverResponse.json();
      console.log(data);

      if (data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherDataLocation = async () => {
    try {
      const serverResponse = await fetch(
        `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`
      );
      const data = await serverResponse.json();
      console.log(data);

      if (data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cityInput);

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80')",
      }}
    >
      <div className="max-w-[500px] bg-[white] p-6 rounded-lg drop-shadow-md">
        <h1 className="font-bold text-2xl uppercase">Get The Weather!</h1>
        <p className="mt-4">Enter a city, and get the weather below!</p>
        <div className="flex flex-col mt-4">
          <input
            onChange={(e) => setCityInput(e.target.value)}
            className="outline-none py-2 px-1 mt-1"
            placeholder="Ex: Stockholm"
          />
          <div className="flex gap-1">
            <button
              onClick={() => getWeatherDataCity()}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-2"
            >
              Get Weather
            </button>
            <button
              onClick={() => getWeatherDataLocation()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-2"
            >
              <MdLocationPin />
            </button>
          </div>
        </div>
        {Object.keys(weatherData).length !== 0 && (
          <>
            <p className=" mt-5 font-bold text-lg">
              {weatherData.name} Weather
            </p>
            <div className="flex items-center">
              <img
                className="w-[100px] h-[100px]"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="weather-icon"
              />
              <p className="mt-2">
                Currently{" "}
                <span className="font-bold">{weatherData.main.temp} &deg;</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

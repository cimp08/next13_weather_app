import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { MdLocationPin } from "react-icons/md";

const baseUrl = "https://api.openweathermap.org/data/2.5";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
  );
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();

  const [weatherData, setWeatherData] = useState<any>({});

  const divStyle = {
    backgroundImage: "url(" + imgUrl + ")",
  };


  useEffect(() => {
    if (Object.keys(weatherData).length !== 0) {
      switch (weatherData.weather[0].icon) {
        case "01d":
          setImgUrl(
            "https://images.unsplash.com/photo-1521333774545-10e8a1f2f7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1003&q=80"
          );
          break;
        case "01n":
          setImgUrl(
            "https://images.unsplash.com/photo-1533722344292-dde61556c32b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          );
          break;
        case "02d":
          setImgUrl(
            "https://images.unsplash.com/photo-1613539423218-6789cfcc5468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          );
          break;
        case "02n":
          setImgUrl(
            "https://images.unsplash.com/photo-1536183922588-166604504d5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          );
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setImgUrl(
            "https://images.unsplash.com/photo-1491237596458-ccbf4462e884?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          );
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setImgUrl(
            "https://images.unsplash.com/photo-1513172128806-2d00531a9f20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          );
          break;
        case "11d":
        case "11n":
          setImgUrl(
            "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          );
          break;
        case "13d":
        case "13n":
          setImgUrl(
            "https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1208&q=80"
          );
          break;
        case "50d":
        case "50n":
          setImgUrl(
            "https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
          );
          break;
        default:
      }
    }
  }, [weatherData]);



  useEffect(() => {
    (async () => {
      try {
        const serverResponse = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_API_KEY_LOCATION}`
        );
        const data = await serverResponse.json();
        setLon(data.location.lng);
        setLat(data.location.lat);
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
        `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric`
      );
      const data = await serverResponse.json();
      console.log(data);

      if (data?.cod === "400") throw data;
      setWeatherData(data);
      console.log(weatherData.weather[0].icon);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cityInput);

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={divStyle}
    >
      <div className="max-w-[500px] bg-[white] bg-opacity-75 p-6 rounded-lg drop-shadow-md">
        <h1 className="font-bold text-2xl uppercase">Get The Weather!</h1>
        <p className="mt-4">Enter a city, and get the weather below!</p>
        <div className="flex flex-col mt-4">
          <input
            onChange={(e) => setCityInput(e.target.value)}
            className="outline-none py-2 px-1 mt-1 bg-[white] bg-opacity-0"
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

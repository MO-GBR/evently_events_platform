'use client'

import React, { useState } from "react";
import DatePicker from "@/Components/Shared/DatePicker";
import { categories } from "@/Constants";
import { updateEvent, getOneEvent } from "@/Lib/Actions/EventActions";
import Image from "next/image";
import { IEvent } from "@/Lib/Database/Models/EventModel";
import FileUploader from "./FileUploader";

const UpdateEventForm = ({ event }: { event: IEvent }) => {
  const [ file, setFile ] = useState(event.image);
  const updateEventValues = updateEvent.bind(null, { eventId: event._id, imgURL: file });
  return (
    <form className="flexCenter flex-col" action={updateEventValues}>
        <div className="flex items-start justify-center">
          <div className="w-[50vw] h-[80vh] p-10 bg-violet-700 rounded-2xl m-5">
            <label className="flexCenter flex-col">
              <span className="font-bold text-white">Tell us more about your event</span>
              <textarea className="w-full h-[40vh] border-none outline-none m-5 rounded-2xl p-3" placeholder="Write everything here !!!" name="details" defaultValue={event?.details} />
            </label>
            <label className="flexCenter">
              <p className="font-bold text-white m-2">Location</p>
              <div className="w-full bg-white flexCenter rounded-full">
                <Image src="/assets/icons/location-grey.svg" alt="calendar" width={20} height={20} className='img w-[20px] m-3' />
                <input type="text" className="border-none outline-none w-[90%]" name="location" defaultValue={event?.location} />
              </div>
            </label>
            <label className="flexCenter flex-col mt-5">
              <select className="border-none outline-none w-[200px] p-2 rounded-xl text-center font-bold bg-white cursor-pointer" name="category" defaultValue={event?.category}>
                <option>Select your category</option>
                {
                  categories.map((category, index) => (
                    <option key={index}>{category.name}</option>
                  ))
                }
              </select>
            </label>
          </div>
          <div className="flexCenter flex-col border h-[120vh] border-blue-200 p-5 m-5 rounded-xl">
            <label className="flexCenter">
                <FileUploader setFile={setFile} uploadType="zone" />
            </label>
            <label className="p-5 w-full">
              <span className="text-center w-full text-blue-900 font-bold">Title</span>
              <div>
                <input className="border-none outline-none w-full" placeholder="Write your event title here" name="title" defaultValue={event?.title} />
              </div>
            </label>
            <label className="p-5 w-full">
              <span className="text-center w-full text-blue-900 font-bold">Describtion</span>
              <div>
                <textarea className="border-none outline-none w-full" placeholder="Write your event describtion here" name="description" defaultValue={event?.description} />
              </div>
            </label>
            <label className="flexCenter flex-col">
              <select className="border-none outline-none w-[200px] p-2 rounded-xl text-center font-bold text-white bg-violet-600 cursor-pointer" name="price" defaultValue={event?.price}>
                <option>Select your price</option>
                <option>Free</option>
                <option>$10</option>
                <option>$20</option>
                <option>$30</option>
              </select>
            </label>
            <DatePicker Picker={{ PickerType: "update", startDateDefaultValue: event?.startDate, startTimeDefaultValue: event?.startTime, endDateDefaultValue: event?.endDate, endTimeDefaultValue: event?.endTime }} />
          </div>
        </div>
        <div className="flexCenter w-full">
          <button className="bg-blue-500 w-[80%] p-5 text-white font-bold rounded-2xl mb-10 g7" type="submit">Submit Event</button>
        </div>
    </form>
  );
}

export default UpdateEventForm
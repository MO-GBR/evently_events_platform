'use client'

import DatePicker from "@/Components/Shared/DatePicker";
import FileUploader from "@/Components/Shared/FileUploader";
import { categories } from "@/Constants";
import { createEvent } from "@/Lib/Actions/EventActions";
import Image from "next/image";
import { useState } from "react";

const CreateEvent = () => {
  const [ file, setFile ] = useState('');
  const CreateNewEvent = createEvent.bind(null, file);
  return (
    <form className="flexCenter flex-col" action={CreateNewEvent}>
        <div className="flex items-start justify-center max-md:flexCenter max-md:flex-col-reverse">
          <div className="w-[50vw] max-md:w-full h-[80vh] max-md:h-[90vh] p-10 bg-violet-700 rounded-2xl m-5">
            <label className="flexCenter flex-col">
              <span className="font-bold text-white">Tell us more about your event</span>
              <textarea className="w-full h-[40vh] border-none outline-none m-5 rounded-2xl p-3" placeholder="Write everything here !!!" name="details" />
            </label>
            <label className="flexCenter max-md:flex-col">
              <p className="font-bold text-white m-2">Location</p>
              <div className="w-full bg-white flexCenter rounded-full">
                <Image src="/assets/icons/location-grey.svg" alt="calendar" width={20} height={20} className='img w-[20px] m-3' />
                <input type="text" className="border-none outline-none w-[90%] max-md:w-[80%]" name="location" />
              </div>
            </label>
            <label className="flexCenter flex-col mt-5">
              <select className="border-none outline-none w-[200px] p-2 rounded-xl text-center font-bold bg-white cursor-pointer" name="category">
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
              <FileUploader setFile={setFile} uploadType='zone' />
            </label>
            <label className="p-5 w-full">
              <span className="text-center w-full text-blue-900 font-bold">Title</span>
              <div>
                <input className="border-none outline-none w-full" placeholder="Write your event title here" name="title" />
              </div>
            </label>
            <label className="p-5 w-full">
              <span className="text-center w-full text-blue-900 font-bold">Describtion</span>
              <div>
                <textarea className="border-none outline-none w-full" placeholder="Write your event describtion here" name="description" />
              </div>
            </label>
            <label className="flexCenter flex-col">
              <select className="border-none outline-none w-[200px] p-2 rounded-xl text-center font-bold text-white bg-violet-600 cursor-pointer" name="price">
                <option>Select your price</option>
                <option>Free</option>
                <option>$10</option>
                <option>$20</option>
                <option>$30</option>
              </select>
            </label>
            <DatePicker Picker={{ PickerType: "create" }} />
          </div>
        </div>
        <div className="flexCenter w-full">
          <button className="bg-blue-500 w-[80%] p-5 text-white font-bold rounded-2xl mb-10 g7" type="submit">Submit Event</button>
        </div>
    </form>
  );
}

export default CreateEvent
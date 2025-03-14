import React from 'react'

type PickerProps = {
    PickerType: string;
    startTimeDefaultValue?: string;
    startDateDefaultValue?: string;
    endTimeDefaultValue?: string;
    endDateDefaultValue?: string
}

const DatePicker = ({ Picker }: { Picker: PickerProps }) => {
    return (
        <div className="flexCenter flex-col mt-5">
            <label className="flexCenter flex-col g7 p-2 m-1 rounded-2xl w-full">
                <span className="font-bold text-white">Starts At</span>
                {
                    Picker.PickerType === "create"
                        ? (
                            <div className="flexCenter max-md:flex-col max-md:p-2">
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">Start Time</span>
                                    <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='startTime' />
                                </label>
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">Start Date</span>
                                    <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='startDate' />
                                </label>
                            </div>
                        ) : (
                            <div className="flexCenter max-md:flex-col max-md:p-2">
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">Start Time</span>
                                    <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='startTime' defaultValue={Picker.startTimeDefaultValue} />
                                </label>
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">Start Date</span>
                                    <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='startDate' defaultValue={Picker.startDateDefaultValue} />
                                </label>
                            </div>
                        )
                }
            </label>
            <label className="flexCenter flex-col g7 m-1 p-2 rounded-2xl">
                <span className="font-bold text-white">Ends At</span>
                {
                    Picker.PickerType === "create"
                        ? (
                            <div className="flexCenter max-md:flex-col max-md:p-2">
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">End Time</span>
                                    <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='endTime' />
                                </label>
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">End Date</span>
                                    <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='endDate' />
                                </label>
                            </div>
                        ) : (
                            <div className="flexCenter max-md:flex-col max-md:p-2">
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">End Time</span>
                                    <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='endTime' defaultValue={Picker.endTimeDefaultValue} />
                                </label>
                                <label className="flexCenter">
                                    <span className="bg-white absolute p-2 rounded-xl text-black font-bold my-2 p-1 w-[200px] hidden max-md:block">End Date</span>
                                    <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='endDate' defaultValue={Picker.endDateDefaultValue} />
                                </label>
                            </div>
                        )
                }
            </label>
        </div>
    )
}

export default DatePicker

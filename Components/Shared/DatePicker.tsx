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
                            <div>
                                <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='startTime' />
                                <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='startDate' />
                            </div>
                        ) : (
                            <div>
                                <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='startTime' defaultValue={Picker.startTimeDefaultValue} />
                                <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='startDate' defaultValue={Picker.startDateDefaultValue} />
                            </div>
                        )
                }
            </label>
            <label className="flexCenter flex-col g7 m-1 p-2 rounded-2xl">
                <span className="font-bold text-white">End Date</span>
                {
                    Picker.PickerType === "create"
                        ? (
                            <div>
                                <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='endTime' />
                                <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='endDate' />
                            </div>
                        ) : (
                            <div>
                                <input type="time" className="border-none outline-none cursor-pointer bg-white p-2 m-2 rounded-xl" name='endTime' defaultValue={Picker.endTimeDefaultValue} />
                                <input type="date" className="border-none outline-none cursor-pointer bg-transparent text-white" name='endDate' defaultValue={Picker.endDateDefaultValue} />
                            </div>
                        )
                }
            </label>
        </div>
    )
}

export default DatePicker
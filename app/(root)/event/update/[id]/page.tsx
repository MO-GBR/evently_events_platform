import UpdateEventForm from '@/Components/Shared/UpdateForm'
import React from 'react'
import { getOneEvent } from "@/Lib/Actions/EventActions";

const UpdateEvent = async ({ params }: { params: Promise<{ id: string }>; }) => {
  const { id } = await params;
  const event = await getOneEvent(id);
  return (
    <div>
      <UpdateEventForm event={JSON.parse(JSON.stringify(event))} />
    </div>
  )
}

export default UpdateEvent
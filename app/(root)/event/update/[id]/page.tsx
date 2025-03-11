import UpdateEventForm from '@/Components/Shared/UpdateForm'
import React from 'react'
import { getOneEvent } from "@/Lib/Actions/EventActions";
import { handleJSON } from '@/Lib/Utils/responseHandle';

const UpdateEvent = async ({ params }: { params: Promise<{ id: string }>; }) => {
  const { id } = await params;
  const event = await getOneEvent(id);
  return (
    <div>
      <UpdateEventForm event={handleJSON(event)} />
    </div>
  )
}

export default UpdateEvent
import { supabase } from "./supabase";

import { Record } from "../domain/record";

export async function getAll(): Promise<Record[]>{
  const response = await supabase.from("study-record").select();
  
  if(response.error){
    throw new Error(response.error.message);
}

const studyRecordData = response.data.map((data) => {
    return new Record(data.id, data.content, data.time)
});

return studyRecordData;
}

export const addContent = async (content: string, time: number): Promise<Record[]> => {
    const { data, error } = await supabase
      .from("study-record")
      .insert({ content: content, time: time })
      .select();
  
    if (error) {
      console.error("Error adding content", error);
      throw error;
    }

    if (!data) {
        throw new Error("No data returned from insert operation");
      }
  
    return data as Record[];
  };


  export const deleteContent = async (id: string) => {
    await supabase.from("study-record").delete().eq("id", id).select();
  };

import axios from "axios";
import { Magician } from "../model/Magician";

export async function getAllCharacters() {
  const url = "https://hp-api.onrender.com/api/characters";
  const response = await axios.get<Magician[]>(url);
  return response.data;
}

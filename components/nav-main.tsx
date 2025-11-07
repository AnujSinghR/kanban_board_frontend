"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import axios from "axios";

import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const [board, setBoard] = useState('');

  interface Board {
  _id: number;
  name: string;
}
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  // Define the structure of a single board object



  const getAllBoards = async () => {
  const response:any = await axios.get('http://localhost:8001/boards');
  let data:[] = response.data;
  setAllBoards(data);
  }

  getAllBoards();

  const addBoard = async () => {
    try{
    const response = await axios.post('http://localhost:8001/boards',{name:board});
    getAllBoards();
    }
    catch(error){
      console.log(error);
    }
  }

  const setBoardId = (id:number) => {
    localStorage.removeItem('activeBoard');
    localStorage.setItem("activeBoard",JSON.stringify(id));
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Create New Board</span>
              
            </SidebarMenuButton>
          
          </SidebarMenuItem>
          <Input onChange={(e) => setBoard(e.target.value)} value={board}/> 
          <Button type="button" onClick={addBoard}>add board</Button>
        </SidebarMenu>
        <SidebarMenu>
          {allBoards.map((item) => (
            <SidebarMenuItem key={item._id}>
              <SidebarMenuButton tooltip={item.name}>
                <span onClick={() => setBoardId(item._id)}>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

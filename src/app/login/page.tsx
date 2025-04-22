'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'


import { useState } from 'react'
import axios_instance from '../../api/axios'
export default function Login() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [disable, setDisable] = useState(false);
const [loading, setLoading] = useState(false);
const router = useRouter()

const handleLoginClick = () => {

    setLoading(true);
    setDisable(true);

    axios_instance.post('login',{
        email: email,
        password: password
    }).then((response: any) => {
        
        const res = response.data;
        if(res.status) {
            toast.success(res.message);
            router.push("/products")
        }else{
            toast.error(res.message);
        }

        localStorage.setItem('token', res.key);

        setLoading(false);
        setDisable(false);
    }).catch((error) => {
        console.log(error)
    })
}
  return (
    <Card className="w-[350px]"> 
        <CardHeader>
            <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Name</Label>
              <Input id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Name</Label>
              <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button disabled={disable} onClick={handleLoginClick}> { !loading ? 'Login' : 'Logging In'}</Button>
      </CardFooter>
      
    </Card>
  )
}
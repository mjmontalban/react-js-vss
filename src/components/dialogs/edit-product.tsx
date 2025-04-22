import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from 'react';

interface IProducts {
    id: number,
    name: String,
    quantity: number
}

interface IDialogProps {
    isOpen: boolean,
    onSaveEdit: (name: String, quantity: number, id: number) => void,
    onClose: (val: boolean) => void,
    name: String | undefined,
    quantity: number | undefined,
    id: number | undefined
}

export default function EditProductDialog(props: IDialogProps) {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState(0);


    const handleSave = () => {
        console.log("name: ", quantity)
        if(name && quantity && id) {
            props.onSaveEdit(name , quantity, id);
        }
    }
  return (
    <Dialog open={props.isOpen}>
    
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={props.name?.toString()}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              defaultValue={props.quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="col-span-3"
            />
             <Input
              id="quantity"
              type="hidden"
              defaultValue={props.id}
              onChange={(e) => setId(parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {props.onClose(false)}}>Close</Button>
          <Button onClick={() => {handleSave()}} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
import { Interface } from "readline"

  interface IItemsProps {
    id: number,
    name: String,
    quantity: number
  }

  interface ITableProps {
    items: IItemsProps[],
    onDelete: (id: number) => void,
    onShowEditDetails: (id: number) => void,
  }

  export default function ProductTable(props: ITableProps) {
    return (
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Button onClick={() => props.onShowEditDetails(item.id)} variant="default">Edit</Button>
                <Button onClick={() => props.onDelete(item.id)} variant="destructive">Delete</Button>
              </TableCell>
              {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  
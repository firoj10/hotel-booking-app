"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ----------------- Zod schema -----------------
const hotelFormSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  hotelDescription: z.string().optional(),
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;

// ----------------- Component -----------------
interface HotelFormProps {
  initialData?: HotelFormValues;
  hotelId?: number;
}

export const HotelForm = ({ initialData = {}, hotelId }: HotelFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(!initialData?.name);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: HotelFormValues) => {
    try {
      const method = hotelId ? "PATCH" : "POST";
      const url = hotelId
        ? `/api/dashboard/hotels/${hotelId}`
        : `/api/dashboard/hotels`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Hotel ${hotelId ? "updated" : "created"} successfully`);
        toggleEdit();
        router.refresh();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hotel Details
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : <><Pencil className="h-4 w-4 mr-2" /> Edit</>}
        </Button>
      </div>

      {!isEditing && (
        <div className="text-sm mt-2 space-y-1">
          {initialData.name && <p><strong>Name:</strong> {initialData.name}</p>}
          {initialData.address && <p><strong>Address:</strong> {initialData.address}</p>}
          {initialData.city && <p><strong>City:</strong> {initialData.city}</p>}
          {initialData.country && <p><strong>Country:</strong> {initialData.country}</p>}
          {initialData.hotelDescription && (
            <p><strong>Description:</strong> {initialData.hotelDescription}</p>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

            {/* Hotel Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Hotel Name" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Address" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="City" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Country" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="hotelDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Hotel Description" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>

          </form>
        </Form>
      )}
    </div>
  );
};
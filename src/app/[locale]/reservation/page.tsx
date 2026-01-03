"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Using our simple Input component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form'; // Assuming installed as per package.json
import { useState } from 'react';

// Simple types for the form
type ReservationFormData = {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    requests?: string;
};

export default function ReservationPage() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ReservationFormData>();

    const onSubmit = (data: ReservationFormData) => {
        console.log("Reservation Submitted:", data);
        setSubmitted(true);
        // Here we would call the API
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Background Image with Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-110 blur-sm brightness-50"
                style={{ backgroundImage: "url('/images/605538335_851589170973315_8298854732230865204_n.jpg')" }}
            />

            <div className="relative z-10 w-full max-w-lg animate-in zoom-in duration-500">
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-serif text-white">Book a Table</CardTitle>
                        <CardDescription className="text-gray-300 font-display text-lg">
                            Reserve your spot for an unforgettable dining experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {submitted ? (
                            <div className="text-center py-12 space-y-4 animate-in fade-in">
                                <div className="text-primary text-5xl">✓</div>
                                <h3 className="text-2xl font-serif text-white">Reservation Confirmed!</h3>
                                <p className="text-gray-400">We look forward to hosting you.</p>
                                <Button onClick={() => setSubmitted(false)} variant="link" className="text-primary">Make another booking</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200">Full Name</label>
                                        <Input
                                            {...register("name", { required: true })}
                                            placeholder="John Doe"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.name && <span className="text-red-400 text-xs">Name is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200">Phone</label>
                                        <Input
                                            {...register("phone", { required: true })}
                                            placeholder="+880..."
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                                        />
                                        {errors.phone && <span className="text-red-400 text-xs">Phone is required</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200">Date</label>
                                        <Input
                                            type="date"
                                            {...register("date", { required: true })}
                                            className="bg-white/5 border-white/10 text-white [color-scheme:dark] focus:border-primary focus:ring-primary"
                                        />
                                        {errors.date && <span className="text-red-400 text-xs">Date is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200">Time</label>
                                        <Input
                                            type="time"
                                            {...register("time", { required: true })}
                                            className="bg-white/5 border-white/10 text-white [color-scheme:dark] focus:border-primary focus:ring-primary"
                                        />
                                        {errors.time && <span className="text-red-400 text-xs">Time is required</span>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-200">Guests</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="20"
                                        defaultValue="2"
                                        {...register("guests", { required: true })}
                                        className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-200">Special Requests</label>
                                    <textarea
                                        {...register("requests")}
                                        className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Birthday, Anniversary, Dietary restrictions..."
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-lg h-12">
                                    Confirm Reservation
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

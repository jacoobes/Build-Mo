import { Link } from "react-router-dom";
import './index.css';
import './assets/scrollbar.css';
import { useState } from 'react'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import cpu from './assets/cpu.svg'
import gpu from './assets/gpu.svg'
import motherboard from './assets/mb.svg'
import ram from './assets/ram.svg'
import ssd from './assets/ssd.svg'
import fan from './assets/fan.svg'
import power_supply from './assets/power_supply.svg'
import pc_case from './assets/pc_case.svg'
import PC_DECON from './assets/case.png'
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




export default function MainPage() {

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground"
      style={{ fontFamily: 'Poppins, sans-serif' }}>
    <div className="min-h-screen flex flex-col ">
      

      <section className="flex flex-col items-center justify-center flex-grow bg-background text-foreground mt-48 md:mt-80 mb-32 md:mb-24 lg:mb-48" style={{fontFamily: 'Poppins, sans-serif'}}>
        <h1 className="text-4xl font-bold mb-4">Empower Your Setup</h1>
        <p className="text-lg mb-8">PC building made simple</p>
        <Link to="/build" className="bg-primary hover:bg-primary-hover text-foreground font-bold py-2 px-4 rounded mb-64">
          Get Started
        </Link>

      </section>

      <section className="bg-background text-foreground " style={{ fontFamily: 'Poppins, sans-serif'}}>
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2 text-center">Inside your PC</h2>
          <h3 className="text-xl mb-32">A deeper look at each essential component</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

            {/* CPU Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-full h-full rounded-none" src = {cpu} alt="CPU Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">CPU</h4>
              <p className="text-sm">
                The brain of your PC, the processor determines overall performance. Learn about clock speeds and how to choose the right one for your needs.
              </p>
            </div>

            {/* GPU Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-full h-full rounded-none" src = {gpu} alt="GPU Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">GPU</h4>
              <p className="text-sm">
              Boost your visuals with a graphics card. Explore VRAM, CUDA cores, and pick a GPU perfect for gaming or creative tasks.
              </p>
            </div>

            {/* MB Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {motherboard}  alt="Motherboard Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">Mother Board</h4>
              <p className="text-sm">
              Connect all parts with the motherboard. Discover sizes, chipsets, and find the best fit for your setup.
              </p>
            </div>

            {/* RAM Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {ram}  alt="RAM Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">RAM</h4>
              <p className="text-sm">
              Speed up your system with RAM. Check capacity, speed, and find the sweet spot for your PC's performance.
              </p>
            </div>

            {/* Storage Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {ssd}  alt="Storage Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">Storage</h4>
              <p className="text-sm">
              Explore storage options – SSDs, HDDs, NVMe drives. Learn about capacity, speed, and pick what suits your needs.
              </p>
            </div>

            {/* Power Supply Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {power_supply}  alt="Power Supply Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">Power Supply</h4>
              <p className="text-sm">
              Keep it running smoothly. Understand wattage, efficiency, and choose a power supply that meets your PC's energy needs.
              </p>
            </div>

            {/* Cooling Syst Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {fan}  alt="Cooling System Icon"/>
              </div>
              <h4 className="text-xl font-bold mb-2">Cooling System</h4>
              <p className="text-sm">
              Avoid overheating with cooling. Check air vs. liquid cooling, fan setups, and keep your components at the right temperature.
              </p>
            </div>

            {/* Case Component Box */}
            <div className=" p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* add icon */}
                <img className="w-20 h-20 rounded-none" src = {pc_case}  alt="Case Icon"/>

              </div>
              <h4 className="text-xl font-bold mb-2">Case</h4>
              <p className="text-sm">
              Your PC's home. Learn about case sizes, airflow, and find one that fits your build's style and practical needs.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-background text-foreground py-64 px-4 md:mt-48" style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="mr-48">
            {/* add image */}
            <img className="h-auto max-w-full rounded-none" src={PC_DECON} alt="Computer Deconstructed"/>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Build smarter, not harder</h2>
            <p className="text-lg">
              Experience hassle-free PC building with our user-friendly PC Part Picker. Seamlessly select, compare, and customize components tailored to your needs. Avoid compatibility issues, save time, and ensure cost-efficiency. Let our tool simplify the process, empowering you to build the perfect PC without the guesswork.
            </p>
          </div>
        </div>
      </section>

        </div>
      </div> 
    </div>
  );
}




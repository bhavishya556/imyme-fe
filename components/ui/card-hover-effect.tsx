import { cn } from "../util/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import BackgroundGradientDemo from "@/components/ServicesComponents/BackgroundGradientNew"
import Image from "next/image";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    img: string;
 
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-5",
        className
      )}
    >
      {items.map((item, idx) => (
           <div
         
           className="relative group  block p-2 h-full w-full"
           onMouseEnter={() => setHoveredIndex(idx)}
           onMouseLeave={() => setHoveredIndex(null)}
         >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-600 dark:bg-slate-100/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
          <div className="w-24 h-24 flex justify-center overflow-hidden">
  <Image
    src={item.img}
    width={100}
    height={100}
    alt="img"
    className="w-full h-full m-auto object-cover"
  />
</div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
           {/* <Card>
           
        <BackgroundGradientDemo title={item.title} description={item.description} />
   
        
          </Card>  */}
          
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4  border-spacing-96 overflow-hidden bg-gray-100 border border-transparent dark:border-white/[0.5] group-hover:border-slate-100 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-600 bg-clip-text text-transparent font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-900 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

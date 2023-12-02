import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="font-mono z-10 flex w-full flex-col items-center justify-between text-sm">
        {/* Container for the image */}
        <div className="relative w-full max-w-3xl">
          {/* The Image component */}
          <Image
            src="/assets/img/chrISCmas.jpeg"
            alt="chrISCmas"
            layout="responsive"
            width={100}
            height={141}
            priority
          />
        </div>
      </div>
    </main>
  );
}

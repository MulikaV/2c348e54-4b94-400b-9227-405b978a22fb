"use client"

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl p-8">
      <section id="hero" className="text-center py-16">
        <h1 className="text-6xl font-bold text-blue-600">Your Name</h1>
        <p className="text-2xl mt-4">Frontend/Full-Stack Developer</p>
        <p className="mt-2">5 years of Frontend/Full-Stack Development delivering performant apps.</p>
      </section>
      <section id="about" className="py-16">
        <h2 className="text-4xl font-bold">About</h2>
        <p className="mt-2">I craft polished web experiences with accessible UI and robust APIs.</p>
      </section>
      <section id="portfolio" className="py-16">
        <h2 className="text-4xl font-bold">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {/* Sample project cards */}
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-xl font-bold">Project Title 1</h3>
            <p className="mt-1">Description of project 1.</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-xl font-bold">Project Title 2</h3>
            <p className="mt-1">Description of project 2.</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-xl font-bold">Project Title 3</h3>
            <p className="mt-1">Description of project 3.</p>
          </div>
        </div>
      </section>
      <section id="resume" className="py-16">
        <h2 className="text-4xl font-bold">Resume</h2>
        <p className="mt-2">Details about the resume.</p>
      </section>
      <section id="contact" className="py-16">
        <h2 className="text-4xl font-bold">Contact</h2>
        <p className="mt-2">Contact information goes here.</p>
      </section>
      <footer className="py-8 text-center">
        <p className="text-sm">© 2023 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
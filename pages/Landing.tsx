import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Layout,
  Download,
  FileText,
  Palette,
  ArrowRight,
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Layout,
      title: "3 Professional Templates",
      description: "Modern Tech, Minimalist ATS, and Executive Suite designs",
    },
    {
      icon: Zap,
      title: "Real-Time Preview",
      description: "See your changes instantly as you type",
    },
    {
      icon: Download,
      title: "Export Options",
      description: "Download as PDF or ATS-friendly DOCX format",
    },
    {
      icon: FileText,
      title: "ATS-Optimized",
      description: "Pass applicant tracking systems with ease",
    },
    {
      icon: Palette,
      title: "Beautiful UI",
      description: "Modern, clean interface with smooth animations",
    },
    {
      icon: Sparkles,
      title: "100% Free",
      description: "No hidden costs, no subscriptions, completely free",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-indigo-400" size={40} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ResuMotion AI
            </h1>
          </div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Create Stunning Resumes
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              In Minutes, Not Hours
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
          >
            Professional resume builder with real-time preview, multiple
            templates, and instant export. No sign-up required. Completely free.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => navigate("/builder")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
          >
            Get Started - It's Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-zinc-500 mt-4"
          >
            No credit card required • No sign-up • No catch
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="group p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-zinc-900/80 transition-all"
            >
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <feature.icon className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">How It Works</h3>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
            Simple, intuitive, and powerful. Build your professional resume in
            three easy steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">Choose Template</h4>
              <p className="text-zinc-400 text-sm">
                Select from 3 professional templates designed for different
                roles
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">Fill Details</h4>
              <p className="text-zinc-400 text-sm">
                Add your information with real-time preview as you type
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Download</h4>
              <p className="text-zinc-400 text-sm">
                Export as PDF or DOCX and start applying for jobs
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-24 text-center"
        >
          <div className="p-12 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build Your Dream Resume?
            </h3>
            <p className="text-zinc-400 mb-8">
              Join thousands of job seekers who created their perfect resume
              with ResuMotion
            </p>
            <button
              onClick={() => navigate("/builder")}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              Start Building Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>
            Made with ❤️ by the ResuMotion team • Built with React, TypeScript,
            and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}


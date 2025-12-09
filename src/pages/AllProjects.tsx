import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';
import { ArrowLeft, Github, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function AllProjects() {
  const { t } = useLanguage();
  const { projects } = portfolioData;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t({ en: 'Back', fr: 'Retour' })}
          </button>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {t({ en: 'All Projects', fr: 'Tous les Projets' })}
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl">
            {t({
              en: 'A complete collection of all my projects, showcasing my expertise across different technologies.',
              fr: 'Une collection complète de tous mes projets, mettant en avant mon expertise dans différentes technologies.'
            })}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              {project.image && (
                <div 
                  className="relative aspect-video overflow-hidden bg-muted cursor-pointer"
                  onClick={() => setSelectedImage(project.image)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                      {t({ en: 'Click to enlarge', fr: 'Cliquez pour agrandir' })}
                    </div>
                  </div>
                </div>
              )}

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {t(project.description)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Liens */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
                    >
                      <Github className="w-5 h-5" />
                      {t({ en: 'Code', fr: 'Code' })}
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {t({ en: 'Live', fr: 'Voir' })}
                    </a>
                  )}
                </div>
              </div>

              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    {t({ en: 'Featured', fr: 'Vedette' })}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Enlarged project"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-background/90 hover:bg-background p-2 rounded-full transition-colors z-60"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

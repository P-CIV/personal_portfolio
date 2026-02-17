import { Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { motion } from 'framer-motion';

export default function Certifications() {
  const { t } = useLanguage();
  const { certifications } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Titre Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: 'Credentials', fr: 'Certifications & Attestations' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t({ en: 'My', fr: 'Mes' })}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t({ en: 'Certifications', fr: 'Certifications' })}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t({
                en: 'Professional certifications and attestations demonstrating my expertise in various technologies and domains.',
                fr: 'Certifications et attestations démontrant mon expertise dans diverses technologies et domaines.'
              })}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {certifications.slice(0, 3).map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                {cert.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {cert.issuer} • {cert.date}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {t(cert.description)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <a
              href="/all-certifications"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {t({ en: 'View All Certifications', fr: 'Voir Tous mes Certificats' })}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

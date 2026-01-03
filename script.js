const { useState, useEffect } = React;

// Lucide Icons Component
const Icon = ({ name, className = "w-6 h-6" }) => {
    useEffect(() => {
        lucide.createIcons();
    }, []);
    return React.createElement('i', { 'data-lucide': name, className });
};

const AestheticGym = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        { icon: 'users', title: 'Personal Training', desc: 'One-on-one coaching tailored to your fitness goals with expert trainers' },
        { icon: 'dumbbell', title: 'Weight Training', desc: 'Build muscle and strength with structured progressive overload programs' },
        { icon: 'heart', title: 'Cardio Training', desc: 'Improve endurance and cardiovascular health with dynamic workouts' },
        { icon: 'zap', title: 'Strength & Conditioning', desc: 'Functional training to enhance athletic performance and mobility' },
        { icon: 'trending-up', title: 'Body Transformation', desc: 'Complete programs designed for dramatic physique changes' },
        { icon: 'apple', title: 'Diet & Nutrition', desc: 'Personalized meal plans and nutritional guidance for optimal results' }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1920',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920',
        'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=1920'
    ];

    useEffect(() => {
        if (isAutoPlaying) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [isAutoPlaying]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormStatus(null);

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setFormStatus({ type: 'error', message: 'All fields are required' });
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({ type: 'error', message: 'Invalid email format' });
            setLoading(false);
            return;
        }

        try {
            // Using Formspree - Replace YOUR_FORM_ID with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/xjgkonea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Message sent successfully! We\'ll contact you soon.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', { className: "min-h-screen bg-black text-gray-100" },
        // Navigation
        React.createElement('nav', { 
            className: `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm shadow-2xl' : 'bg-transparent'}`
        },
            React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement('div', { className: "flex justify-between items-center h-20" },
                    React.createElement('div', { 
                        className: "flex items-center space-x-3 cursor-pointer",
                        onClick: () => scrollToSection('home')
                    },
                        React.createElement('img', { 
                            src: "./logo.png",
                            alt: "Aesthetic Gym",
                            className: "w-12 h-12 transition-transform hover:scale-110"
                        }),
                        React.createElement('span', { className: "text-2xl font-bold text-gray-100 tracking-tight" }, 'AESTHETIC GYM')
                    ),
                    React.createElement('div', { className: "hidden md:flex space-x-8" },
                        ['home', 'services', 'gallery', 'contact'].map(section =>
                            React.createElement('button', {
                                key: section,
                                onClick: () => scrollToSection(section),
                                className: "text-sm font-semibold tracking-wide uppercase text-gray-400 hover:text-gray-100 transition-colors"
                            }, section)
                        )
                    ),
                    React.createElement('button', {
                        className: "md:hidden text-gray-300",
                        onClick: () => setMobileMenuOpen(!mobileMenuOpen)
                    }, React.createElement(Icon, { name: mobileMenuOpen ? 'x' : 'menu' }))
                )
            )
        ),
        
        // Hero Section
        React.createElement('section', {
            id: 'home',
            className: "relative min-h-screen flex items-center justify-center overflow-hidden"
        },
            React.createElement('div', { className: "absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" }),
            React.createElement('div', {
                className: "absolute inset-0 opacity-20",
                style: {
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }
            }),
            React.createElement('div', { className: "relative z-10 text-center px-4 max-w-5xl mx-auto" },
                React.createElement('img', {
                    src: "./logo.png",
                    alt: "Aesthetic Gym",
                    className: "w-28 h-28 mx-auto mb-8"
                }),
                React.createElement('h1', { className: "text-5xl sm:text-6xl md:text-8xl font-bold text-gray-100 mb-6 tracking-tight leading-tight" },
                    'BUILD YOUR BEST',
                    React.createElement('br'),
                    React.createElement('span', { className: "text-gray-400" }, 'AESTHETIC')
                ),
                React.createElement('p', { className: "text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed" },
                    'Transform your body, elevate your mind, and unlock your true potential in our premium training facility'
                ),
                React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center" },
                    React.createElement('button', {
                        onClick: () => scrollToSection('contact'),
                        className: "px-10 py-4 bg-gray-100 text-black font-bold text-lg tracking-wide hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg"
                    }, 'JOIN NOW'),
                    React.createElement('button', {
                        onClick: () => scrollToSection('services'),
                        className: "px-10 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-bold text-lg tracking-wide hover:bg-gray-800 hover:border-gray-300 transition-all transform hover:scale-105"
                    }, 'VIEW SERVICES')
                )
            )
        ),

        // Services Section
        React.createElement('section', {
            id: 'services',
            className: "py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'OUR SERVICES'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg max-w-2xl mx-auto" }, 'Premium training programs designed to help you achieve your fitness goals')
                ),
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" },
                    services.map((service, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: "bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700 hover:border-gray-500 transition-all cursor-pointer"
                        },
                            React.createElement(Icon, { name: service.icon, className: "w-12 h-12 text-gray-400 mb-4" }),
                            React.createElement('h3', { className: "text-xl font-bold text-gray-100 mb-3 tracking-wide" }, service.title),
                            React.createElement('p', { className: "text-gray-400 leading-relaxed" }, service.desc)
                        )
                    )
                )
            )
        ),

        // Gallery Section
        React.createElement('section', {
            id: 'gallery',
            className: "py-24 px-4 bg-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'GALLERY'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg" }, 'Experience the aesthetic gym environment')
                ),
                React.createElement('div', { className: "relative max-w-5xl mx-auto" },
                    React.createElement('div', { className: "relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl" },
                        galleryImages.map((img, idx) =>
                            React.createElement('div', {
                                key: idx,
                                className: `absolute inset-0 transition-opacity duration-800 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`
                            },
                                React.createElement('img', {
                                    src: img,
                                    alt: `Gym ${idx + 1}`,
                                    className: "w-full h-full object-cover"
                                })
                            )
                        )
                    ),
                    React.createElement('div', { className: "flex justify-center gap-2 mt-6" },
                        galleryImages.map((_, idx) =>
                            React.createElement('button', {
                                key: idx,
                                onClick: () => { setCurrentSlide(idx); setIsAutoPlaying(false); },
                                className: `w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-gray-100 w-8' : 'bg-gray-600 hover:bg-gray-400'}`
                            })
                        )
                    )
                )
            )
        ),

        // Contact Section
        React.createElement('section', {
            id: 'contact',
            className: "py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'CONTACT US'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg" }, 'Get in touch and start your transformation journey')
                ),
                React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-12" },
                    React.createElement('div', null,
                        React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Full Name',
                                value: formData.name,
                                onChange: (e) => setFormData({...formData, name: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
                            }),
                            React.createElement('input', {
                                type: 'email',
                                placeholder: 'Email Address',
                                value: formData.email,
                                onChange: (e) => setFormData({...formData, email: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
                            }),
                            React.createElement('input', {
                                type: 'tel',
                                placeholder: 'Phone Number',
                                value: formData.phone,
                                onChange: (e) => setFormData({...formData, phone: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500"
                            }),
                            React.createElement('textarea', {
                                placeholder: 'Your Message',
                                rows: 5,
                                value: formData.message,
                                onChange: (e) => setFormData({...formData, message: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
                            }),
                            formStatus && React.createElement('div', {
                                className: `flex items-center gap-2 p-4 ${formStatus.type === 'success' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`
                            },
                                React.createElement(Icon, { name: formStatus.type === 'success' ? 'check-circle' : 'alert-circle', className: "w-5 h-5" }),
                                React.createElement('span', { className: formStatus.type === 'success' ? 'text-green-300' : 'text-red-300' }, formStatus.message)
                            ),
                            React.createElement('button', {
                                type: 'submit',
                                disabled: loading,
                                className: "w-full px-10 py-4 bg-gray-100 text-black font-bold text-lg tracking-wide hover:bg-gray-300 transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                            }, loading ? 'SENDING...' : 'SEND MESSAGE')
                        )
                    ),
                    React.createElement('div', { className: "space-y-8" },
                        React.createElement('div', { className: "bg-gray-900 p-8 border border-gray-700" },
                            React.createElement('h3', { className: "text-2xl font-bold text-gray-100 mb-6" }, 'GET IN TOUCH'),
                            React.createElement('div', { className: "space-y-4" },
                                React.createElement('div', { className: "flex items-start gap-4" },
                                    React.createElement(Icon, { name: 'map-pin', className: "w-6 h-6 text-gray-400 mt-1" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Address'),
                                        React.createElement('p', { className: "text-gray-400" }, 'Sundar Vihar Colony, Station Rd, near DIG Basti, Civil Lines, Jhansi, Uttar Pradesh 284001')
                                    )
                                ),
                                React.createElement('div', { className: "flex items-start gap-4" },
                                    React.createElement(Icon, { name: 'phone', className: "w-6 h-6 text-gray-400 mt-1" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Phone'),
                                        React.createElement('p', { className: "text-gray-400" }, '+91 76519 23441')
                                    )
                                ),
                                React.createElement('div', { className: "flex items-start gap-4" },
                                    React.createElement(Icon, { name: 'mail', className: "w-6 h-6 text-gray-400 mt-1" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Email'),
                                        React.createElement('p', { className: "text-gray-400" }, 'info@aestheticgym.com')
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),

        // Footer
        React.createElement('footer', { className: "bg-black border-t border-gray-800 py-12 px-4" },
            React.createElement('div', { className: "max-w-7xl mx-auto text-center" },
                React.createElement('p', { className: "text-gray-600 text-sm" }, '© 2026 Aesthetic Gym. All rights reserved. Built for excellence.')
            )
        )
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AestheticGym));

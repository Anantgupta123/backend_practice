import React, { useState, useEffect } from 'react';
import { FiCheck, FiAward, FiTrendingUp } from 'react-icons/fi';
import { serviceAPI } from '../services/endpoints.js';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../components/UIComponents.jsx';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAllServices();
        setServices(response.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Your AC Needs, Our Expertise
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Professional AC installation, repair, and maintenance services. Available 24/7 for emergency repairs.
              </p>
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary px-8 py-3 text-lg"
                  >
                    Book Service Now
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary px-8 py-3 text-lg"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl">❄️</div>
              <p className="text-lg mt-4 text-blue-100">Keeping You Cool</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Services</h2>

          {loading ? (
            <LoadingSpinner />
          ) : services.length === 0 ? (
            <p className="text-center text-gray-600">No services available at the moment.</p>
          ) : (
            <div className="grid-3">
              {services.map((service) => (
                <div key={service._id} className="card hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-2 text-blue-600">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="font-semibold">
                      Price: <span className="text-green-600">₹{service.basePrice}</span>
                    </p>
                    <p className="text-sm text-gray-500">Duration: {service.duration}</p>
                  </div>
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2">Features:</p>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <FiCheck className="text-green-600" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {isAuthenticated && (
                    <Link
                      to="/dashboard"
                      className="btn btn-primary w-full block text-center"
                    >
                      Book Now
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="grid-3">
            <div className="card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick response and fast service delivery to get your AC running smoothly.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">👨‍🔧</div>
              <h3 className="text-xl font-bold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">
                Trained and certified professionals with years of experience.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We guarantee quality work with satisfaction assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="grid_3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card border border-gray-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Excellent service! The technician was professional and fixed our AC in no time. Highly recommended!"
                </p>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">AC Repair Service</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl mb-8">Experience professional AC servicing today</p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
              Book Service Now
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
              Create Account & Book
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

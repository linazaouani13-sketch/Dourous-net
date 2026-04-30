import React from 'react';
import { Check, Zap, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for students getting started with online learning.",
      features: [
        "1 Free trial session",
        "Access to browse teachers",
        "Basic study materials",
        "Standard support"
      ],
      icon: <Star className="text-gray-400" size={24} />,
      buttonText: "Start for free",
      popular: false
    },
    {
      name: "Premium",
      price: "49",
      description: "The most popular choice for regular academic support.",
      features: [
        "10 Sessions per month",
        "Priority teacher booking",
        "Advanced study materials",
        "24/7 Priority support",
        "Monthly progress reports"
      ],
      icon: <Zap className="text-primary-600" size={24} />,
      buttonText: "Get Premium",
      popular: true
    },
    {
      name: "Elite",
      price: "99",
      description: "Full access for students aiming for top-tier results.",
      features: [
        "Unlimited sessions",
        "Personal learning path",
        "Private Slack community",
        "Dedicated mentor",
        "Exclusive exam prep"
      ],
      icon: <Shield className="text-success-600" size={24} />,
      buttonText: "Go Elite",
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
          Choose the plan that fits your academic goals and start excelling today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`relative p-8 rounded-[2.5rem] border transition-all duration-300 ${
              plan.popular 
                ? 'bg-white dark:bg-gray-900 border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 z-10' 
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-primary-200'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </span>
            )}
            
            <div className="mb-8">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">€{plan.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success-50 dark:bg-success-900/20 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-success-600 dark:text-success-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/signup"
              className={`block w-full py-4 text-center font-bold rounded-2xl transition-all active:scale-[0.98] ${
                plan.popular 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20' 
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-gray-500 text-sm font-medium">
          Have a large group? <a href="#" className="text-primary-600 hover:underline">Contact us</a> for custom institutional pricing.
        </p>
      </div>
    </div>
  );
};

export default Pricing;

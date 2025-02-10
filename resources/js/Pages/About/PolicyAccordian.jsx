import React, { useState, useRef } from 'react';
import { Transition } from '@headlessui/react';

export default function PolicyTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);

  const policies = [
    {
      title: 'Quality Policy',
      content: (
        <div className="space-y-4">
          <p>
            AQI Services is committed to maintaining the highest standards of quality
            across all its operations, ensuring the necessary competency and resources
            are in place to achieve excellence.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              AQI Services will consistently uphold the highest levels of ethics,
              integrity, confidentiality, impartiality, and accountability in serving
              its clients to ensure exceptional quality.
            </li>
            <li>
              AQI Services will strive to meet and exceed client expectations by adhering
              to standard requirements and fostering continuous organizational improvement.
            </li>
            <li>
              AQI Services adopts a Zero Tolerance policy for any internal or external
              unethical practices.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Statement Of Impartiality',
      content: (
        <div className="space-y-4">
          <p>
            This procedure outlines the methods employed by AQI Services to ensure that its
            Board, management, staff, inspectors/auditors, and contractors maintain impartiality
            at all times during their interactions with clients, prospective clients, and throughout
            the certification and evaluation processes.
          </p>
          <p>
            To uphold this commitment, all individuals working for or on behalf of AQI Services are
            required to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sign a code of conduct and confidentiality agreement</li>
            <li>Disclose any potential conflicts of interest</li>
            <li>Maintain professional boundaries both during and outside business hours</li>
          </ul>
          <p>
            The Managing Director, CEO, and staff of AQI Services are dedicated to ensuring that
            impartiality is upheld across all operations and activities. Any relationships between
            individuals associated with AQI Services and external organizations or individuals are
            disclosed, reviewed, documented, and assessed for risks.
          </p>
          <p>
            AQI Services maintains a strict policy of not allowing commercial, financial, or other
            external pressures to influence the impartiality of its personnel or its certification
            processes. The organization is fully committed to safeguarding the integrity of its
            activities and ensuring that all certification operations are carried out without bias.
          </p>
        </div>
      ),
    },
    {
      title: 'Appeal And Complain Policy',
      content: (
        <div className="space-y-4">
          <p>
            This procedure establishes a structured process for reviewing and resolving appeals and
            complaints, ensuring appropriate actions are taken to prevent recurrence. The scope of this
            procedure includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Addressing formal appeals and complaints from AQI Services' registered operators or
              applicants
            </li>
            <li>
              Managing formal appeals and complaints submitted by users of AQI Services' certified
              clients
            </li>
            <li>
              Handling formal appeals and complaints from stakeholders, such as clients, vendors,
              brands, or partners
            </li>
            <li>
              Processing formal appeals and complaints from AQI Services' regional or international
              offices
            </li>
            <li>
              Acknowledging and addressing verbal complaints and anonymous submissions, where
              credible evidence is provided
            </li>
            <li>
              Ensuring disagreements between file reviewers and Lead Auditors/Inspectors are resolved
              transparently through the internal appeals and complaints process
            </li>
          </ul>

          <p>
            AQI Services maintains a strict protocol for tracking and analyzing all complaints to
            identify systemic issues and implement preventive measures. Our resolution process
            includes escalation procedures for complex cases and regular reporting to senior
            management for quality assurance.
          </p>
        </div>
      ),
    },
    {
      title: 'Anti-Corruption Policy',
      content: (
        <div className="space-y-4">
          <p>
            This procedure reflects AQI Services' commitment to impartiality, fairness, and continuous
            improvement in its certification and evaluation activities. Our anti-corruption policy
            specifically mandates:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Zero tolerance for bribery, kickbacks, or improper inducements</li>
            <li>Mandatory corruption risk assessments for all business operations</li>
            <li>Regular anti-corruption training for all employees and contractors</li>
            <li>Third-party due diligence for vendors and partners</li>
            <li>Secure whistleblowing channels for reporting suspicious activities</li>
            <li>Independent audits of financial transactions and procurement processes</li>
          </ul>
          <p>
            AQI Services maintains a strict policy of prohibiting any form of corrupt practice,
            including but not limited to bribery, embezzlement, kickbacks, and abuse of position.
            All employees and associates are required to annually certify their compliance with this
            policy.
          </p>
        </div>
      ),
    },
  ];

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % policies.length;
      setActiveTab(nextIndex);
      tabRefs.current[nextIndex].focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + policies.length) % policies.length;
      setActiveTab(prevIndex);
      tabRefs.current[prevIndex].focus();
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:justify-between md:items-start gap-8">
      {/* Logo Section - Left Aligned */}
      <div className="md:mt-20 md:sticky md:top-8 md:w-[30%] h-fit">
        <div className="flex justify-center md:justify-start">
          <img
            src="/images/Logo.svg"
            alt="Company Logo"
            className="w-full max-w-xs md:w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Policies Section - Right Aligned */}
      <div className="md:w-[65%] space-y-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">
          Company Policies & Procedures
        </h2>

        {/* Tab Buttons */}
        <div role="tablist" className="flex flex-wrap gap-2">
          {policies.map((policy, index) => (
            <button
              key={index}
              role="tab"
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-selected={activeTab === index}
              className={`px-6 py-3 rounded-lg text-sm font-bold focus:outline-none transition-colors duration-300 border focus:ring-2 focus:ring-offset-2 focus:ring-primary
                ${
                  activeTab === index
                    ? 'bg-primary text-white shadow-md border-b-4 border-primary'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
            >
              {policy.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <Transition
            key={activeTab}
            appear={true}
            show={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div role="tabpanel" className="text-gray-700 leading-relaxed space-y-5">
              {policies[activeTab].content}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

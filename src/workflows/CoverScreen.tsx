import React, { ReactElement } from 'react';

interface CoverScreenProps {
  onStart: () => void;
  heading?: string;
  description?: string;
  details?: ReactElement;
  coverImage?: string;
  workflowSVG?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const CoverScreen: React.FC<CoverScreenProps> = ({
  onStart,
  heading,
  description,
  details,
  coverImage,
  workflowSVG: WorkflowSVG,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 font-sans bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      {/* Main Heading */}
      <div className="w-full pt-16 pb-6 px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center leading-tight mb-3">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {heading || 'AI Hiring Assistant'}
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-4xl text mb-6 font-medium">
          {description || 'Transform raw resumes into clean, structured candidate profiles—instantly and effortlessly.'}
        </p>
      </div>

      {/* Centered Image or SVG */}
      <div className="w-full flex justify-center mb-12">
        {coverImage ? (
          <img
            src={coverImage}
            alt="Dynamic Pricing Agent Cover"
            className="rounded-2xl shadow-xl w-full max-w-2xl object-cover border-4 border-white"
          />
        ) : WorkflowSVG ? (
          <div
            className="w-full max-w-2xl rounded-2xl shadow-xl border-4 border-white bg-gradient-to-br from-[#232946] to-[#181c2f] flex items-center justify-center"
            style={{ minHeight: 260 }}
          >
            <WorkflowSVG width={820} height={260} />
          </div>
        ) : (
          <img
            src="https://plus.unsplash.com/premium_photo-1663040543283-a39c4554106b?q=80&w=2070&auto=format&fit=crop"
            alt="AI Assistant"
            className="rounded-2xl shadow-xl w-full max-w-2xl object-cover border-4 border-white"
          />
        )}
      </div>

      {/* Details Section for rich content */}
      {details && (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-0 mb-12">
          <div className="space-y-12">
{React.Children.map(details.props.children, (section) => {
  if (!React.isValidElement(section)) return null;

  const sectionElement = section as React.ReactElement<any>;

  return React.cloneElement(sectionElement, {
    className: `${sectionElement.props.className || ''} mb-8`,
    children: React.Children.map(sectionElement.props.children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childElement = child as React.ReactElement<any>;

      if (childElement.type === 'h2') {
        const text = childElement.props.children;

        if (typeof text === 'string') {
          const highlightedText = text.replace(
            /(AI|Use Cases|Stands Out|Features|Components Used)/g,
            match => `<span class="text-indigo-600 font-extrabold">${match}</span>`
          );

          return (
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          );
        }

        return (
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {text}
          </h2>
        );
      }

      return childElement;
    }),
  });
})}



          </div>
        </div>
      )}

      {/* Start Now Button */}
      <div className="w-full flex justify-center pb-16">
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default CoverScreen;

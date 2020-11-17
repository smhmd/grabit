import React from 'react';

function FeatureText({ title, description }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold sm:text-lg md:text-xl lg:text-3xl">
        {title}
      </h3>
      <p className="text-sm md:text-base">{description}</p>
    </div>
  );
}

function FeatureImg({ src }) {
  return (
    <div className="hidden h-full sm:block">
      <img className="h-full" src={src} alt="" />
    </div>
  );
}

export { FeatureImg, FeatureText };

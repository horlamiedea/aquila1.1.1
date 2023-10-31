import  { useState, useEffect } from 'react';

function Accordion( {children, title, id, active = false}) {

  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, []);

  return (
    <div className="py-2 my-4 ">
      
      {(!accordionOpen && <button
          className="flex items-center w-full text-left font-semibold py-2"
          onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <svg className="fill-red shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <rect y="7" width="16" height="2" rx="1" className={`ttransform origin-center transition duration-200 ease-out ${accordionOpen ? 'rotate-180' : ''}`} />
            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen ? 'rotate-180' : ''}`} />
          </svg>
          <span className='pl-4 text-2xl font-semibold text-grey'>{title}</span>
        </button>)}
      
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid text-sm  text-grey bg-white rounded-xl min-h-0 overflow-hidden transition-all duration-1000 ease-in-out  ${accordionOpen ? 'grid-rows-[1fr] ' : 'grid-rows-[0fr]'}`}
      >
        
       {(accordionOpen && <button
          className="flex items-center  w-full text-left font-semibold py-2"
          onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <svg className="fill-red shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <rect y="7" width="16" height="2" rx="1" className={`ttransform origin-center transition duration-200 ease-out ${accordionOpen ? 'rotate-180' : ''}`} />
            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-180 transition duration-200 ease-out ${accordionOpen ? 'rotate-180' : ''}`} />
          </svg>
          <span className='pl-4 text-xl lg:text-2xl font-semibold text-grey'>{title}</span>
        </button>)}
        <div className="overflow-hidden">
          <p className="p-4 pl-16 font-lato text-base">
            {children}
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default Accordion;

import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';


export default function FileStructure() {
    const data = {
      Evaluation: {
        Desktop: ["Screenshot1.jpg", "videopal.mp4"],
        Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
        Downloads: {
          Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
          Images: []
        },
        Applications: ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"],
        "chromedriver.dmg": [] 
      }
    };
  
    return (
      <div>
        
        <ul>
          {Object.keys(data).map((key) => (
            <FileSystem key={key} node={data[key]} name={key} />
          ))}
        </ul>
      </div>
    );
  }


//function for creating folder structure
function FileSystem({ node, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = Array.isArray(node) ? node.length > 0 : typeof node === 'object';

 
  if (Array.isArray(node)) {
    return (
      <li key={node}>
        <div className="flex items-center gap-1.5 py-1">
            
            {isFolder ? (<>
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
                    <ChevronRightIcon className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}/>
                </button>
                
            </>) :
            (<DocumentIcon className="size-5 text-gray-500 " />)}
            
          {name}
        </div>
        {isOpen && (
            <ul className="pl-6">
            {node.map((file) => (
                <li key={file} className="flex items-center gap-1.5 py-1">
                <DocumentIcon className="size-5 text-gray-500 " />
                {file}
                </li>
            ))}
            </ul>)
        }
      </li>
    );
  }


  return (
    <li key={node}>
      <div className="flex items-center gap-1.5 py-1">
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
          <ChevronRightIcon
            className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
        {name}
      </div>
      {isOpen && (
        <ul className="pl-6">
          {Object.keys(node).map((key) => (
            <FileSystem key={key} node={node[key]} name={key} />
          ))}
        </ul>
      )}
    </li>
  );
}




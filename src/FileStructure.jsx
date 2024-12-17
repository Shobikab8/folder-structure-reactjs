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
        "chromedriver.dmg" : undefined
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

// for creating folder structure
function FileSystem({ node, name }) {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node!=null && typeof node === 'object'; // True for folders (arrays or objects)
  
  return (
    <li>
      <div className="flex items-center gap-1.5 py-1">
        
        {isFolder ? 
            (
                <>
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
                    <ChevronRightIcon
                    className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
                    />
                </button>
              </>
            ) :(
            <DocumentIcon className="size-5 text-gray-500" />
          )
          
        }
        <span>{name}</span>
      </div>

      {/* Renders child nodes recursively */}
      {isOpen && isFolder && (
        <ul className="pl-6">
          {Array.isArray(node) ? (
            // Render files in a folder
            node.map((file) => (
              <FileSystem key={file} node={null} name={file} />
            ))
          ) : (
            // Render subfolders and files
            Object.keys(node).map((key) => (
              <FileSystem key={key} node={node[key]} name={key} />
            ))
          )}
        </ul>
      )}
    </li>
  );
}

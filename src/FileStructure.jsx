import React, { useState } from 'react';
import jsonData from './components/data.json';
import FileSystem from './components/FileSystem';
import { ChevronRightIcon, DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/16/solid';


export default function FileStructure() {
  const data = jsonData;
  const projectName = "evaluation";
  const [isRootOpen, setIsRootOpen] = useState(false);

  const addNewItem = (type) => {
    setData((prev) => ({
      ...prev,
      Evaluation: {
        ...prev.Evaluation,
        [type === "folder" ? "NewFolder" : "NewFile"]: type === "folder" ? {} : undefined
      }
    }));
  };

  return (
    <div className=" bg-gray-900 p-4 rounded-lg text-gray-300 max-w-md m-5">
      <ul className="mt-4">
        <li>
        <button onClick={() => setIsRootOpen(!isRootOpen)} className="p-1 -m-1">
            <ChevronRightIcon className={`w-4 h-4 text-gray-500 transition-transform ${isRootOpen ? 'rotate-90' : ''}`}/>            
        </button>
            <span className='p-2'>{projectName.toUpperCase()}</span>
            <button onClick={()=> addNewItem("folder")}><DocumentPlusIcon className='size-5 text-gray-500'/></button>
            <button onClick={()=> addNewItem("folder")}><FolderPlusIcon className='size-5 text-gray-500'/></button>
        </li>
        {Object.keys(data).map((key) => (
          isRootOpen && (<FileSystem key={key} node={data[key]} name={key} />)
        ))
        }
      </ul>
    </div>
  );
}



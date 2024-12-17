import { ChevronRightIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';

const FileStructure = () => {
  const data = [
    {
      Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
      Desktop: ["Screenshot1.jpg", "videopal.mp4"],
      Downloads: {
        Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
        Applications: [
          "Webstorm.dmg",
          "Pycharm.dmg",
          "FileZila.dmg",
          "Mattermost.dmg",
        ],
      },
    },
    "chromedriver.dmg",
  ];

  return (
    <div>
      <ul>
        <li>
          <strong>EVALUATION</strong>
        </li>
        {data.map((item, index) => (
          <Folder key={index} name={item} />
        ))}
      </ul>
    </div>
  );
};

function Folder({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  if (Array.isArray(name)) {
    return (
      <ul>
        {name.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else if (typeof name === "object" && name !== null) {
    return (
      <ul>
        {Object.keys(name).map((key, index) => (
          <li key={index}>
            <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
              <ChevronRightIcon style={{ height: "12px", marginRight: "5px" }} />
              {key}
            </div>
            {isOpen && <Folder name={name[key]} />}
          </li>
        ))}
      </ul>
    );
  } else {
    return <li>{name}</li>;
  }
}

export default FileStructure;

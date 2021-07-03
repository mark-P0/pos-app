import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { contentProportion, usedIconNames } from './common';

/* This a MUCH simpler way, but loses autocompletion *smh*
const styles: {
  [component: string]: React.CSSProperties;
} = {...}
*/

const stylesGenericTyping = <
  typeHolder extends { [component: string]: React.CSSProperties }
>(
  styleObject: typeHolder
) => styleObject;

const styles = stylesGenericTyping({
  Sidebar: {
    /* As child */
    flex: `${contentProportion.sidebar}%`,
    minWidth: 0,

    /* As parent */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // paddingBottom: 256,

    color: 'silver',
    backgroundColor: 'dimgray',
    padding: 5,
  },
  SidebarItemHover: {
    color: 'white', // Actually "color on hover"
  },
  // SidebarItem: {
  //   ':hover': {},
  // },
  SidebarItemIcon: {
    width: '100%',
    height: 24,
  },
  SidebarItemText: {
    fontSize: 'x-small',
    textAlign: 'center',
  },
});

export default function Sidebar() {
  return (
    <div style={styles.Sidebar}>
      {/* {['Identification', 'Core Functions', 'Administrative'].map(
        (text, index) => (
          <div key={index} style={{ width: '100%' }}>
            {text}
          </div>
        )
      )} */}

      <SidebarItem icon="cash-register" isStatic={true} />

      <CustomDivider />

      <SidebarItem icon="user-alt" />
      <SidebarItem icon="bug" name="Dashboard" />

      <CustomDivider />

      {/* Ano pa ilalagay dito hahahaha */}
      <SidebarItem icon="bug" name="Start" />
      <SidebarItem icon="bug" name="Receipts" />
      <SidebarItem icon="bug" name="Inventory" />

      <CustomDivider />

      <SidebarItem icon="file-invoice-dollar" name="Transactions" />
      <SidebarItem icon="users" name="Customers" />
      <SidebarItem icon="id-card" name="Employees" />

      <CustomDivider />

      <SidebarItem icon="cog" name="Settings" />

      {/* <div style={{ backgroundColor: 'grey', margin: 10 }}>MGN</div>
      <div style={{ backgroundColor: 'mediumvioletred', padding: 10 }}>PDG</div> */}
    </div>
  );
}

function SidebarItem({
  name,
  icon,
  isStatic,
}: {
  name?: string;
  icon: IconProp;
  isStatic?: boolean;
}) {
  let [itemColor, setItemColor] = useState(styles.Sidebar.color);

  if (!usedIconNames.includes(icon)) {
    alert(`\`${icon}\` icon not in library.`);
    return <></>;
  }

  if (icon === 'bug') {
    itemColor = 'maroon';
  }

  if (isStatic) {
    setItemColor = (...args) => {};
  }

  return (
    <div
      onMouseEnter={() => {
        setItemColor(styles.SidebarItemHover.color);
        // Show item tooltip?
      }}
      onMouseLeave={() => setItemColor(styles.Sidebar.color)}
      style={{ color: itemColor }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={styles.SidebarItemIcon}
        onClick={() => alert(`From \`${icon}\` item.`)}
      />
      {name ? <div style={styles.SidebarItemText}>{name}</div> : null}

      {/* Pull this tooltip forward??? */}
      <Tooltip visibility={0}>{name}</Tooltip>
    </div>
  );
}

const modalRoot = document.getElementById('modal-root');
// Arrow function to type `props` expansion...
const Tooltip: React.FC<{
  visibility: number;
}> = ({ children, visibility = 0 }) => {
  const modalContainer = document.createElement('div');
  // modalContainer.style.opacity = `${visibility}`;
  modalContainer.style.position = 'absolute';
  // modalContainer;

  useEffect(() => {
    modalRoot?.appendChild(modalContainer);
    return () => {
      modalRoot?.removeChild(modalContainer);
    };
  }, [modalContainer]);

  // return <></>;

  return ReactDOM.createPortal(children, modalContainer);
};

function CustomDivider({ color, height }: { color?: string; height?: number }) {
  const defaultValue = {
    color: 'gray',
    height: 2,
  };

  return (
    <div
      style={{
        width: '100%',
        // border: 0,
        borderRadius: 12,

        // color: color || defaultValue.color,
        backgroundColor: color || defaultValue.color,
        height: height || defaultValue.height,
      }}
    />
  );
}

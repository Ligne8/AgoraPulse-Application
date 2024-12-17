import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export interface TagsProps {
  id: string;
  name: string;
  selected: boolean;
}

interface TagButtonProps extends TagsProps {
  // eslint-disable-next-line
  onClick: (tag: TagsProps) => void;
}

interface TagsSelectorProps {
  tags: TagsProps[];
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
        selected: boolean;
      }[]
    >
  >;
}

function TagButton({ id, name, selected, onClick }: TagButtonProps) {
  const [currentStyleButton, setCurrentStyleButton] = React.useState([styles.tagsButton, styles.tagsButtonUnselected]);
  const [currentStyleText, setCurrentStyleText] = React.useState(styles.tagButtonText);
  useEffect(() => {
    if (selected == true) {
      setCurrentStyleButton([styles.tagsButton, styles.tagsButtonSelected]);
      setCurrentStyleText(styles.tagButtonTextSelected);
    } else {
      setCurrentStyleButton([styles.tagsButton, styles.tagsButtonUnselected]);
      setCurrentStyleText(styles.tagButtonText);
    }
  }, [selected]);
  return (
    <TouchableOpacity
      onPressIn={() => {
        if (selected == false) {
          setCurrentStyleButton([styles.tagsButton, styles.tagsButtonSelected]);
          setCurrentStyleText(styles.tagButtonTextSelected);
        } else {
          setCurrentStyleButton([styles.tagsButton, styles.tagsButtonUnselected]);
          setCurrentStyleText(styles.tagButtonText);
        }
        onClick({ id, name, selected });
      }}
      style={currentStyleButton}
    >
      <Text style={currentStyleText}>{name}</Text>
    </TouchableOpacity>
  );
}

export function TagsSelector({ tags, setTags }: TagsSelectorProps) {
  const onClick = (tag: TagsProps) => {
    setTags(
      tags.map((t) => {
        if (t.id === tag.id) {
          return { ...t, selected: !t.selected };
        }
        return t;
      })
    );
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {tags.map((tag) => (
          <TagButton key={tag.id} name={tag.name} id={tag.id} selected={tag.selected} onClick={onClick} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: -5,
    height: 180,
    borderWidth: 0,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagsButton: {
    borderRadius: 50,
    height: 30,
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tagsButtonUnselected: {
    borderColor: '#CCCCCC',
    backgroundColor: '#EEEEEE',
  },
  tagsButtonSelected: {
    borderColor: '#0E3D60',
    backgroundColor: '#0E3D60',
  },

  tagButtonText: {
    color: '#0E3D60',
    fontSize: 14,
    flexShrink: 1, // Allow text to take only the space it needs
    fontFamily: 'Montserrat',
  },

  tagButtonTextSelected: {
    color: 'white',
    fontSize: 14,
    flexShrink: 1, // Allow text to take only the space it needs
    fontFamily: 'Montserrat-Bold',
  },
});

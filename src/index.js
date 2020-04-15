import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import api from './services/api';

const App = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    const handleProject = async () => {
        const { data: project } = await api.post('projects', {
            name: `Novo projeto ${Date.now()}`,
            owner: 'Cleber Gomes',
        });

        setProjects([...projects, project]);
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.name}</Text>
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleProject}>
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#fff',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzg0MTQyOCwiZXhwIjoxOTU5NDE3NDI4fQ.tvnt-PX-zO5kUUCjQ2DnUNJlI3Gsd8XDgbGhWk7O-h0';
const SUPABASE_URL = 'https://uootpetooivpwxydefff.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => { // pegar um obj especifico dentro do conjunto de dados
                //console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
                console.log(data);
            });
    }, []);
    // Sua lógica vai aqui
    // Usuário
    // Digita mensagem no campo textarea
    // Aperta enter para enviar
    // Mensagem aparece na listagem

    // ./Sua lógica vai aqui
    // Dev
    // [OK] Campo textarea
    // [OK] Usar o onChange para mudar a mensagem
    // [OK] Usar useState
    // [] if para interpretar o enter
    // [] Lista de mensagens

    function handleNovaMensagem(novaMensagem) {
        const mensagem = { //mensagem é um obj --> dados dentro do objeto sao o que o backend espera
            //id: listaDeMensagens.length + 1, //ids tem q ser unicos em html
            from: "Bea-Araujo",
            text: novaMensagem
        }
        //chamada de um backend
        supabaseClient
            .from('mensagens')
            .insert([
                // Objeto com os msm campos dentro do database no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando Mensagem:', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);


            })
        /*
        
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        */
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',

                }}

            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}
                    <MessageList mensagens={listaDeMensagens} />

                    {/*listaDeMensagens.map((mensagemAtual) => {
                        console.log(mensagemAtual);
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.from}: {mensagemAtual.text}
                            </li>)
                    })*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            // function {nomeDaFunção}(){} ou () => {}
                            onChange={(event) => {
                                //console.log('Usuario digitou:  ', event);
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                //console.log(event.key);
                                if (event.key === 'Enter') {
                                    //console.log('enviar');
                                    event.preventDefault(); //evita quebra de linha do enter
                                    setMensagem('');
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                wordbreak: 'break-word',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.text}
                    </Text>
                );
            })}

        </Box>
    )
}
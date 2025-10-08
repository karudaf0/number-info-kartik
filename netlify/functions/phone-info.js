const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    const { number } = event.queryStringParameters;
    
    if (!number) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Phone number required' })
        };
    }

    try {
        console.log(`🔍 Fetching info for number: ${number}`);
        const response = await fetch(`https://yahu.site/api/?number=${number}&key=The_ajay`);
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response:', data);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('❌ API Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to fetch data',
                details: error.message 
            })
        };
    }
};

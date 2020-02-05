const hentApiHelse = async (): Promise<String> => {
    let responsBody = {} as String;
    const respons = await fetch('/tilretteleggingsbehov-innsyn/api/health', {
        method: 'GET',
        credentials: 'include'
    });
    //console.log("respons", respons);
    if (respons.ok) {
        responsBody = await respons.text();
    }
    console.log("responsbody", responsBody);
    return responsBody;
};

export default hentApiHelse;

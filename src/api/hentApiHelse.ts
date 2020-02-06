const hentApiHelse = async (): Promise<String> => {
    let responsBody = {} as String;
    const respons = await fetch('/tilretteleggingsbehov-innsyn/api/health', {
        method: 'GET',
        credentials: 'include',
    });
    if (respons.ok) {
        responsBody = await respons.text();
    }
    return responsBody;
};

export default hentApiHelse;

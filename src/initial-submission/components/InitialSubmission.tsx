import React, { useState } from 'react';
import ArticleType from './ArticleType';

export default function InitialSubmission(): JSX.Element {
    const [selectedArticleType, setSelectedArticleType] = useState<string>(null);
    const handleChange = (articleType: string): void => setSelectedArticleType(articleType);

    return (
        <div>
            <ArticleType handleChange={handleChange} />
        </div>
    );
}

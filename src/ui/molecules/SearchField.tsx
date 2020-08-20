import React, { ChangeEvent, useState } from 'react';
import { TextField } from '../atoms';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    showHelpText?: boolean;
    placeholder?: string;
}

const SearchField = ({ id, onChange, showHelpText = false, placeholder }: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const [search, setSearch] = useState('');
    const [empty, setEmpty] = useState(true);
    const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (onChange) {
            event.persist();
            onChange(event);
        }
        setSearch(event.currentTarget.value);
        setEmpty(event.currentTarget.value.length === 0);
    };

    const clearSearch = (): void => {
        onChange(({ currentTarget: { value: '' } } as unknown) as React.ChangeEvent<HTMLInputElement>);
        setSearch('');
        setEmpty(true);
    };

    return (
        <TextField
            id={id}
            icon={empty ? <Search /> : <Close onClick={clearSearch} />}
            value={search}
            onChange={change}
            helperText={showHelpText ? t('search-box--helper') : null}
            placeholder={placeholder}
        />
    );
};

export default SearchField;

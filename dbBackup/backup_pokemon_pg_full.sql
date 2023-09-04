--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2023-09-04 11:47:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Pokemon";
--
-- TOC entry 3337 (class 1262 OID 16394)
-- Name: Pokemon; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Pokemon" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'French_France.1252';


ALTER DATABASE "Pokemon" OWNER TO postgres;

\connect "Pokemon"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16395)
-- Name: pokemon; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pokemon;


ALTER SCHEMA pokemon OWNER TO postgres;


--
-- TOC entry 211 (class 1259 OID 16406)
-- Name: PokemonTypes; Type: TABLE; Schema: pokemon; Owner: postgres
--

CREATE TABLE pokemon."PokemonTypes" (
    id integer NOT NULL,
    type text,
    color text,
    "position" integer
);


ALTER TABLE pokemon."PokemonTypes" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16405)
-- Name: PokemonTypes_id_seq; Type: SEQUENCE; Schema: pokemon; Owner: postgres
--

CREATE SEQUENCE pokemon."PokemonTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pokemon."PokemonTypes_id_seq" OWNER TO postgres;

--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 210
-- Name: PokemonTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: pokemon; Owner: postgres
--

ALTER SEQUENCE pokemon."PokemonTypes_id_seq" OWNED BY pokemon."PokemonTypes".id;


--
-- TOC entry 212 (class 1259 OID 16429)
-- Name: Pokemon_id_seq; Type: SEQUENCE; Schema: pokemon; Owner: postgres
--

CREATE SEQUENCE pokemon."Pokemon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pokemon."Pokemon_id_seq" OWNER TO postgres;

--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 212
-- Name: Pokemon_id_seq; Type: SEQUENCE OWNED BY; Schema: pokemon; Owner: postgres
--

ALTER SEQUENCE pokemon."Pokemon_id_seq" OWNED BY pokemon."Pokemon".id;


--
-- TOC entry 3180 (class 2604 OID 16433)
-- Name: Pokemon id; Type: DEFAULT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."Pokemon" ALTER COLUMN id SET DEFAULT nextval('pokemon."Pokemon_id_seq"'::regclass);


--
-- TOC entry 3179 (class 2604 OID 16409)
-- Name: PokemonTypes id; Type: DEFAULT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."PokemonTypes" ALTER COLUMN id SET DEFAULT nextval('pokemon."PokemonTypes_id_seq"'::regclass);


--
-- TOC entry 3331 (class 0 OID 16430)
-- Dependencies: 213
-- Data for Name: Pokemon; Type: TABLE DATA; Schema: pokemon; Owner: postgres
--

INSERT INTO pokemon."Pokemon" (id, name, hp, cp, picture, created, types) VALUES (1, 'Bulbizarre', 25, 5, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png', '2023-08-09', '{Plante,Poison}');
INSERT INTO pokemon."Pokemon" (id, name, hp, cp, picture, created, types) VALUES (2, 'Salamèche', 28, 7, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png', '2023-08-09', '{Feu}');
INSERT INTO pokemon."Pokemon" (id, name, hp, cp, picture, created, types) VALUES (10, 'Chenipan', 10, 5, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png', '2023-08-13', '{Insecte,Vol,Eau}');


--
-- TOC entry 3329 (class 0 OID 16406)
-- Dependencies: 211
-- Data for Name: PokemonTypes; Type: TABLE DATA; Schema: pokemon; Owner: postgres
--

INSERT INTO pokemon."PokemonTypes" (id, type, color, "position") VALUES (13, 'Feu', '#ef5350', 1);
INSERT INTO pokemon."PokemonTypes" (id, type, color, "position") VALUES (14, 'Eau', '#6694ff', 2);
INSERT INTO pokemon."PokemonTypes" (id, type, color, "position") VALUES (15, 'Plante', '#0eaf11', 3);
INSERT INTO pokemon."PokemonTypes" (id, type, color, "position") VALUES (16, 'Electrique', '#f1f524', 4);


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 210
-- Name: PokemonTypes_id_seq; Type: SEQUENCE SET; Schema: pokemon; Owner: postgres
--

SELECT pg_catalog.setval('pokemon."PokemonTypes_id_seq"', 17, true);


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 212
-- Name: Pokemon_id_seq; Type: SEQUENCE SET; Schema: pokemon; Owner: postgres
--

SELECT pg_catalog.setval('pokemon."Pokemon_id_seq"', 20, true);


--
-- TOC entry 3186 (class 2606 OID 16491)
-- Name: Pokemon PokemonName; Type: CONSTRAINT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."Pokemon"
    ADD CONSTRAINT "PokemonName" UNIQUE (name);


--
-- TOC entry 3182 (class 2606 OID 16413)
-- Name: PokemonTypes PokemonTypes_pkey; Type: CONSTRAINT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."PokemonTypes"
    ADD CONSTRAINT "PokemonTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3188 (class 2606 OID 16437)
-- Name: Pokemon Pokemon_pkey; Type: CONSTRAINT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."Pokemon"
    ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY (id);


--
-- TOC entry 3184 (class 2606 OID 16493)
-- Name: PokemonTypes uniqueName; Type: CONSTRAINT; Schema: pokemon; Owner: postgres
--

ALTER TABLE ONLY pokemon."PokemonTypes"
    ADD CONSTRAINT "uniqueName" UNIQUE (type);

--
-- TOC entry 232 (class 1255 OID 16486)
-- Name: createpokemon(text, integer, integer, text, text[]); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.createpokemon(_name text, _hp integer, _cp integer, _picture text, _types text[]) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
	newindex INTEGER;
begin
 	INSERT INTO pokemon."Pokemon"
	(id, name, hp, cp, picture, "types", created)
	values (
		DEFAULT,
		_name, 
		_hp,
		_cp,
		_picture,
		_types,
		NOW())
	RETURNING id INTO newindex;
	
	RETURN newindex;
end;
$$;


ALTER FUNCTION pokemon.createpokemon(_name text, _hp integer, _cp integer, _picture text, _types text[]) OWNER TO postgres;

--
-- TOC entry 214 (class 1255 OID 16505)
-- Name: createtype(text, text, integer); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.createtype(_type text, _color text, _position integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
	newindex INTEGER;
begin
 	INSERT INTO pokemon."PokemonTypes"
	(id, type, color, position)
	values (
		DEFAULT,
		_type,
		_color,
		_position)
	RETURNING id INTO newindex;
	
	RETURN newindex;
end;
$$;


ALTER FUNCTION pokemon.createtype(_type text, _color text, _position integer) OWNER TO postgres;

--
-- TOC entry 233 (class 1255 OID 16489)
-- Name: deletepokemon(integer); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.deletepokemon(_id integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 	DELETE FROM pokemon."Pokemon"
	WHERE id = _id;
	
	RETURN FOUND;
end;
$$;


ALTER FUNCTION pokemon.deletepokemon(_id integer) OWNER TO postgres;

--
-- TOC entry 216 (class 1255 OID 16496)
-- Name: deletetype(integer); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.deletetype(_id integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 	DELETE FROM pokemon."PokemonTypes"
	WHERE id = _id;
	
	RETURN FOUND;
end;
$$;


ALTER FUNCTION pokemon.deletetype(_id integer) OWNER TO postgres;

--
-- TOC entry 215 (class 1255 OID 16450)
-- Name: getallpokemon(); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.getallpokemon() RETURNS TABLE(id integer, name text, hp integer, cp integer, picture text, created date, types text[])
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 -- logic
 	RETURN QUERY
	 select 
		pk.id, 
		pk.name,
		pk.hp,
		pk.cp,
		pk.picture,
		pk.created,
		pk."types"
	from pokemon."Pokemon" as pk;
end;
$$;


ALTER FUNCTION pokemon.getallpokemon() OWNER TO postgres;

--
-- TOC entry 217 (class 1255 OID 16507)
-- Name: getalltypes(); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.getalltypes() RETURNS TABLE(id integer, name text, color text, _position integer)
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 -- logic
 	RETURN QUERY
	 select 
		pkt.id, 
		pkt.type,
		pkt.color,
		pkt.position
	from pokemon."PokemonTypes" as pkt;
end;
$$;


ALTER FUNCTION pokemon.getalltypes() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16430)
-- Name: Pokemon; Type: TABLE; Schema: pokemon; Owner: postgres
--

CREATE TABLE pokemon."Pokemon" (
    id integer NOT NULL,
    name text,
    hp integer,
    cp integer,
    picture text,
    created date,
    types text[]
);


ALTER TABLE pokemon."Pokemon" OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 16458)
-- Name: getpokemonbyid(integer); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.getpokemonbyid(myid integer) RETURNS SETOF pokemon."Pokemon"
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 	RETURN QUERY
	 select 
		*
	from pokemon."Pokemon" as pk
	where pk.id = myId;
end;
$$;


ALTER FUNCTION pokemon.getpokemonbyid(myid integer) OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 16462)
-- Name: updatepokemonbyid(integer, text, integer, integer, text, text[]); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.updatepokemonbyid(_id integer, _name text, _hp integer, _cp integer, _picture text, _types text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 	UPDATE pokemon."Pokemon"
	SET name = _name, 
		hp = _hp,
		cp = _cp,
		picture = _picture,
		types = _types
	WHERE id = _id;
	
	RETURN FOUND;
end;
$$;


ALTER FUNCTION pokemon.updatepokemonbyid(_id integer, _name text, _hp integer, _cp integer, _picture text, _types text[]) OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 16509)
-- Name: updatetypebyid(integer, text, text, integer); Type: FUNCTION; Schema: pokemon; Owner: postgres
--

CREATE FUNCTION pokemon.updatetypebyid(_id integer, _name text, _color text, _position integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare 
-- variable declaration
begin
 	UPDATE pokemon."PokemonTypes"
	SET type = _name, 
		color = _color,
		position = _position
	WHERE id = _id;
	
	RETURN FOUND;
end;
$$;


ALTER FUNCTION pokemon.updatetypebyid(_id integer, _name text, _color text, _position integer) OWNER TO postgres;



-- Completed on 2023-09-04 11:47:43

--
-- PostgreSQL database dump complete
--


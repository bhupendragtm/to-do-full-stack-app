CREATE TABLE
  public.todos (
    id serial NOT NULL,
    title character varying(255) NULL,
    description character varying(255) NULL,
    users character varying(25) NULL
  );

ALTER TABLE
  public.todos
ADD
  CONSTRAINT todos_pkey PRIMARY KEY (id)
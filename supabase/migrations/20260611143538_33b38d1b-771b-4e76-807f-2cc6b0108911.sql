-- Explicit deny-all policies for client roles on contact_messages.
-- Contact form submissions are written exclusively via the trusted server
-- function (service role, which bypasses RLS). Browser clients must never
-- read or write this table directly.
CREATE POLICY "Deny all client reads of contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny all client writes of contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all client updates of contact messages"
ON public.contact_messages
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Deny all client deletes of contact messages"
ON public.contact_messages
FOR DELETE
TO anon, authenticated
USING (false);
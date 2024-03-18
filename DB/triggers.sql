delimiter aa
create trigger after_delivery 
after insert on deliveries for each row
begin
	update stores set stores.number = stores.number + new.number where stores.prodId = new.prodId;
    if (select number from stores where stores.prodId = new.prodId) > 0 then
        update prods set prods.available = 1 where prods.id = new.prodId;
    end if;
end aa

delimiter aa
create trigger after_order 
after insert on orders for each row
begin
	update stores set stores.number = stores.number - new.number where stores.prodId = new.prodId;
    if (select number from stores where stores.prodId = new.prodId) = 0 then
        update prods set prods.available = 0 where prods.id = new.prodId;
    end if;
    if (select number from stores where stores.prodId = new.prodId) < 0 then
        update stores set number = 0 where stores.prodId = new.prodId;
    end if;
end aa
